#!/usr/bin/env node
/**
 * validate-skills.js
 *
 * Validates every skill in skills/ against repository conventions.
 *
 * Checks (errors block CI):
 *   - SKILL.md exists in every skill directory
 *   - YAML frontmatter present with 'name' and 'description' fields
 *   - frontmatter 'name' matches the directory name
 *   - description does not exceed 1024 characters
 *   - required sections are present
 *
 * Checks (warnings, do not block CI):
 *   - cross-skill references point to known skills
 *
 * Exit codes: 0 = all clear, 1 = one or more errors
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.resolve(__dirname, '..', 'skills');
const MAX_DESCRIPTION_LENGTH = 1024;

// Sections every standard SKILL.md must contain.
// Each entry is an array of acceptable heading strings.
const REQUIRED_SECTIONS = [
  ['## Overview'],
  ['## When to Use'],
  ['## Common Rationalizations'],
  ['## Red Flags'],
  ['## Verification'],
];

// Skills that are intentionally exempt from section checks.
const SECTION_EXEMPT_SKILLS = {
  'using-skills-for-agents':
    'Meta-skill that orchestrates other skills and intentionally uses alternate structure.',
  'idea-refine':
    'Legacy structure predating skill-anatomy.md; tracked for conformance in upstream repository.',
};

// Regex patterns indicating explicit cross-skill references.
const SKILL_REF_PATTERNS = [
  /\buse the `([a-z][a-z0-9-]+[a-z0-9])` skill/g,
  /\bfollow the `([a-z][a-z0-9-]+[a-z0-9])` skill/g,
  /\binvoke the `([a-z][a-z0-9-]+[a-z0-9])` skill/g,
  /\bcontinue with `([a-z][a-z0-9-]+[a-z0-9])`/g,
  /\buse `([a-z][a-z0-9-]+[a-z0-9])` skill/g,
  /`([a-z][a-z0-9-]+[a-z0-9])` skill\b/g,
  /`([a-z][a-z0-9-]+[a-z0-9])` persona\b/g,
  /\bsee `([a-z][a-z0-9-]+[a-z0-9])`/g,
  /--> ([a-z][a-z0-9-]+[a-z0-9])\b/g,
  /→ `([a-z][a-z0-9-]+[a-z0-9])`/g,
];

/**
 * Removes a leading UTF-8 BOM from file content when present.
 * Some repository files start with BOM and would otherwise fail frontmatter parsing.
 */
function stripBom(content) {
  return content.replace(/^\uFEFF/, '');
}

/**
 * Parse YAML-style frontmatter from the top of a markdown file.
 * Returns a key/value object, or null if no frontmatter block found.
 */
function parseFrontmatter(content) {
  const normalized = stripBom(content);
  const match = normalized.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n/);
  if (!match) return null;

  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

function extractSkillReferences(content) {
  const refs = new Set();
  for (const pattern of SKILL_REF_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      refs.add(match[1]);
    }
  }
  return refs;
}

function validateSkill(dirName, knownSkills) {
  const errors = [];
  const warnings = [];
  let exempt = false;
  const skillPath = path.join(SKILLS_DIR, dirName, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    errors.push('Missing SKILL.md');
    return { errors, warnings, exempt };
  }

  const content = fs.readFileSync(skillPath, 'utf8');
  const normalizedContent = stripBom(content);

  const fm = parseFrontmatter(normalizedContent);
  if (!fm) {
    errors.push('Missing or malformed YAML frontmatter (expected --- block at top of file)');
    return { errors, warnings, exempt };
  }

  if (!fm.name) {
    errors.push("Frontmatter missing required field: 'name'");
  } else if (fm.name !== dirName) {
    errors.push(`Frontmatter name '${fm.name}' does not match directory name '${dirName}'`);
  }

  if (!fm.description) {
    errors.push("Frontmatter missing required field: 'description'");
  } else if (fm.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(
      `Description is ${fm.description.length} chars; exceeds the ${MAX_DESCRIPTION_LENGTH}-char limit` +
        ' (agents inject this into the system prompt)'
    );
  }

  if (fm.type === 'meta' || fm.exempt === 'sections') {
    if (!SECTION_EXEMPT_SKILLS[dirName]) {
      errors.push(
        `Frontmatter declares 'type: meta' or 'exempt: sections' but '${dirName}' is not in ` +
          "the validator's SECTION_EXEMPT_SKILLS allowlist. " +
          'Add an entry to scripts/validate-skills.js with a documented reason.'
      );
    }
  }

  exempt = dirName in SECTION_EXEMPT_SKILLS;

  if (!exempt) {
    for (const aliases of REQUIRED_SECTIONS) {
      const found = aliases.some((heading) => normalizedContent.includes(heading));
      if (!found) {
        errors.push(`Missing required section: ${aliases[0]}`);
      }
    }
  }

  const refs = extractSkillReferences(normalizedContent);
  for (const ref of refs) {
    if (!knownSkills.has(ref)) {
      warnings.push(`Dead cross-reference: \`${ref}\` is not a known skill`);
    }
  }

  return { errors, warnings, exempt };
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`ERROR: skills directory not found at ${SKILLS_DIR}`);
    process.exit(1);
  }

  const skillDirs = fs
    .readdirSync(SKILLS_DIR)
    .filter((entry) => fs.statSync(path.join(SKILLS_DIR, entry)).isDirectory())
    .sort();

  const knownSkills = new Set(skillDirs);

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const dirName of skillDirs) {
    const { errors, warnings, exempt } = validateSkill(dirName, knownSkills);
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0 && warnings.length === 0) {
      const tag = exempt ? ' (section checks exempt)' : '';
      console.log(`  ✓  ${dirName}${tag}`);
      continue;
    }

    const icon = errors.length > 0 ? '  ✗ ' : '  ⚠ ';
    console.log(`${icon} ${dirName}`);
    for (const message of errors) console.log(`       ERROR: ${message}`);
    for (const message of warnings) console.log(`       WARN:  ${message}`);
  }

  const status =
    totalErrors > 0 ? 'FAILED' : totalWarnings > 0 ? 'PASSED WITH WARNINGS' : 'PASSED';

  console.log(`\n${skillDirs.length} skills checked - ${totalErrors} error(s), ${totalWarnings} warning(s) - ${status}`);

  if (totalErrors > 0) process.exit(1);
}

main();

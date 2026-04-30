/**
 * BBOS Per-Task Template — generate, download, validate, and import
 * blank .bbos task templates for offline form filling.
 */

import { downloadJson } from './bbos-export';

/**
 * Generate a blank template JSON from a BBOS task definition.
 */
export function generateTaskTemplate(taskDef) {
  const fields = {};
  for (const field of taskDef.fields) {
    fields[field.id] = '';
  }
  return {
    schema_version: '1.0',
    format: 'maqasid-bbos-task-template',
    task_type: taskDef.id,
    stage: taskDef.stage,
    sub_level: taskDef.subLevel,
    label: taskDef.label,
    fields,
    g_label: null,
    instructions: 'Fill in each field with your data. Re-upload this file into MILOS to populate the task.',
  };
}

/**
 * Download a blank .bbos template for a single task.
 */
export function downloadTaskTemplate(taskDef) {
  const template = generateTaskTemplate(taskDef);
  const filename = `${taskDef.id}-template.bbos.json`;
  downloadJson(template, filename);
}

/**
 * Validate an uploaded template JSON against a task definition.
 * Returns { valid: boolean, errors: string[] }.
 */
export function validateTaskTemplate(json, taskDef) {
  const errors = [];

  if (!json || typeof json !== 'object') {
    errors.push('File is not valid JSON.');
    return { valid: false, errors };
  }

  if (json.format !== 'maqasid-bbos-task-template') {
    errors.push(`Invalid format: expected "maqasid-bbos-task-template", got "${json.format}".`);
  }

  if (json.task_type !== taskDef.id) {
    errors.push(`Task type mismatch: expected "${taskDef.id}", got "${json.task_type}".`);
  }

  if (!json.fields || typeof json.fields !== 'object') {
    errors.push('Missing or invalid "fields" object.');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Import field data from a validated template into the task's expected shape.
 * Returns a fieldData object: { [fieldId]: value }.
 */
export function importTaskTemplate(json, taskDef) {
  const fieldData = {};
  const validFieldIds = new Set(taskDef.fields.map((f) => f.id));

  for (const [key, value] of Object.entries(json.fields || {})) {
    if (validFieldIds.has(key) && value !== '') {
      fieldData[key] = value;
    }
  }

  return { fieldData, gLabel: json.g_label || null };
}

// ── Stage Bundle (all tasks in one stage) ────────────────────────────────────

/**
 * Generate a stage bundle: one file containing blank (or pre-filled) templates
 * for every task in a stage. existingTasks is optional — if provided, current
 * field values are included so the user gets a pre-filled starting point.
 */
export function generateStageBundleTemplate(stageId, stageDefs, existingTasks = []) {
  return {
    schema_version: '1.0',
    format: 'maqasid-bbos-stage-bundle',
    stage: stageId,
    exported_at: new Date().toISOString(),
    tasks: stageDefs.map((def) => {
      const existing = existingTasks.find((t) => t.bbosTaskType === def.id);
      const fields = {};
      for (const field of def.fields) {
        fields[field.id] = existing?.bbosFieldData?.[field.id] ?? '';
      }
      return {
        schema_version: '1.0',
        format: 'maqasid-bbos-task-template',
        task_type: def.id,
        stage: def.stage,
        sub_level: def.subLevel,
        label: def.label,
        fields,
        g_label: existing?.gLabel ?? null,
      };
    }),
    instructions: 'Fill in the fields for each task in this bundle, then re-upload into MILOS to populate all stage tasks at once.',
  };
}

/**
 * Download a stage bundle as a single .bbos.json file.
 */
export function downloadStageBundleTemplate(stageId, stageDefs, existingTasks = []) {
  const bundle = generateStageBundleTemplate(stageId, stageDefs, existingTasks);
  downloadJson(bundle, `${stageId}-stage-bundle.bbos.json`);
}

/**
 * Validate a stage bundle file.
 */
export function validateStageBundleTemplate(json, stageId) {
  const errors = [];
  if (!json || typeof json !== 'object') {
    errors.push('File is not valid JSON.');
    return { valid: false, errors };
  }
  if (json.format !== 'maqasid-bbos-stage-bundle') {
    errors.push(`Invalid format: expected "maqasid-bbos-stage-bundle", got "${json.format}".`);
  }
  if (json.stage !== stageId) {
    errors.push(`Stage mismatch: this bundle is for "${json.stage}", but the active stage is "${stageId}".`);
  }
  if (!Array.isArray(json.tasks)) {
    errors.push('Missing or invalid "tasks" array.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Extract the task list from a validated stage bundle.
 * Returns an array of { taskType, fieldData, gLabel } objects.
 */
export function importStageBundleTemplate(json) {
  return (json.tasks || []).map((t) => ({
    taskType: t.task_type,
    fieldData: t.fields || {},
    gLabel: t.g_label || null,
  }));
}

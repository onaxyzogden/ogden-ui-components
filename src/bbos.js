// Subpath barrel for the BBOS surface of @ogden/ui-components.
//
// Consumers should import the BBOS CSS bundle once at app entry, alongside
// the main maqasid CSS:
//   import '@ogden/ui-components/style.css';
//   import '@ogden/ui-components/bbos.css';
//
// Then named imports work as expected:
//   import {
//     BbosFullDashboard,
//     BbosTaskPanel,
//     BbosProjectTemplatePicker,
//     BbosRolePicker,
//     BbosRoleBadge,
//     seedBbosTasks,
//   } from '@ogden/ui-components/bbos';
//
// The data + service helpers (BBOS_STAGES, BBOS_TASK_DEFINITIONS, etc.) are
// re-exported wholesale so consumers do not need to depend on the package's
// internal layout.

// ── Components ─────────────────────────────────────────────────────────────
export { default as BbosFullDashboard } from './components/bbos/BbosFullDashboard.jsx';
export { default as BbosTaskPanel } from './components/bbos/BbosTaskPanel.jsx';
export { default as BbosRolePicker } from './components/bbos/BbosRolePicker.jsx';
export { default as BbosRoleBadge } from './components/bbos/BbosRoleBadge.jsx';
export { default as BbosProjectTemplatePicker } from './components/bbos/BbosProjectTemplatePicker.jsx';

// ── Services ───────────────────────────────────────────────────────────────
export { seedBbosTasks } from './services/bbos/seedBbosTasks.js';
export * from './services/bbos/bbos-template.js';
export * from './services/bbos/bbos-export.js';

// ── Data ───────────────────────────────────────────────────────────────────
export * from './data/bbos/bbos-pipeline.js';
export * from './data/bbos/bbos-task-definitions.js';
export * from './data/bbos/bbos-role-access.js';
export * from './data/bbos/bbos-stage-islamic.js';

import { BBOS_TASK_DEFINITIONS } from '../../data/bbos/bbos-task-definitions';

/**
 * Build the seed array of 9 BBOS tasks for a freshly created project.
 *
 * Pure helper — does not touch storage. Caller is responsible for persisting
 * the returned array (e.g. into a Zustand store or localStorage).
 *
 * @param {object} args
 * @param {string} args.projectId       Owning project id (set on each task).
 * @param {() => string} args.makeId    Factory that returns a unique task id.
 * @param {Array<{id: string, name?: string}>} args.columns
 *                                      The project's columns. Tasks land in the
 *                                      first column (columns[0].id), which by
 *                                      MILOS convention is "To Do".
 * @returns {object[]} Task[] (length 9), one per BBOS_TASK_DEFINITIONS entry,
 *                    in stage/seedOrder order.
 */
export function seedBbosTasks({ projectId, makeId, columns }) {
  if (!projectId || typeof makeId !== 'function' || !Array.isArray(columns) || columns.length === 0) {
    throw new Error('seedBbosTasks: projectId, makeId, and non-empty columns are required.');
  }
  const todoColumnId = columns[0].id;
  const now = new Date().toISOString();
  return BBOS_TASK_DEFINITIONS.map((def, i) => ({
    id: makeId(),
    projectId,
    columnId: todoColumnId,
    title: `${def.id} · ${def.label}`,
    description: '',
    priority: 'medium',
    dueDate: null,
    tags: [def.stage],
    subtasks: [],
    checklist: [],
    attachments: [],
    order: i,
    seedOrder: i,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    bbosTaskType: def.id,
    bbosStage: def.stage,
    bbosFieldData: {},
  }));
}

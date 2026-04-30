/**
 * BBOS Import/Export — JSON format designed for LLM-assisted form filling.
 */

/**
 * Export a BBOS project's tasks as a structured JSON object.
 * Includes project metadata and all task data with field schemas.
 */
export function exportBbosProject(project, tasks) {
  return {
    _format: 'maqasid-bbos-export',
    _version: '1.0',
    _exportedAt: new Date().toISOString(),
    project: {
      id: project.id,
      name: project.name,
      bbosStage: project.bbosStage,
      bbosCycle: project.bbosCycle,
      bbosRole: project.bbosRole,
    },
    columns: project.columns.map((c) => ({ id: c.id, name: c.name })),
    tasks: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description || '',
      columnId: t.columnId,
      columnName: project.columns.find((c) => c.id === t.columnId)?.name || '',
      priority: t.priority,
      tags: t.tags || [],
      subtasks: (t.subtasks || []).map((s) => ({ title: s.title, done: s.done })),
      bbosTaskType: t.bbosTaskType,
      bbosStage: t.bbosStage,
      bbosFieldData: t.bbosFieldData || {},
      gLabel: t.gLabel || null,
      dueDate: t.dueDate,
    })),
    instructions: 'This JSON contains BBOS pipeline data for an Islamic business project. '
      + 'Each task has a bbosTaskType (e.g. IDY-S1) and bbosFieldData containing form field values. '
      + 'To help the user fill in missing fields, review the task titles, descriptions, and existing field data, '
      + 'then suggest appropriate values for empty bbosFieldData entries.',
  };
}

/**
 * Trigger a JSON file download in the browser.
 */
export function downloadJson(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import BBOS task data from a JSON file into a project.
 * Updates existing tasks (matched by bbosTaskType) or creates new ones.
 */
export function importBbosData(json, projectId, taskStore) {
  if (!json || json._format !== 'maqasid-bbos-export') {
    throw new Error('Invalid BBOS export file format');
  }

  const existingTasks = taskStore.tasksByProject[projectId] || [];
  let updated = 0;
  let created = 0;

  for (const importTask of json.tasks) {
    const existing = importTask.bbosTaskType
      ? existingTasks.find((t) => t.bbosTaskType === importTask.bbosTaskType)
      : null;

    if (existing) {
      // Merge field data and description
      const mergedFields = { ...existing.bbosFieldData, ...importTask.bbosFieldData };
      taskStore.updateTask(projectId, existing.id, {
        description: importTask.description || existing.description,
        bbosFieldData: mergedFields,
        gLabel: importTask.gLabel || existing.gLabel,
        tags: importTask.tags?.length ? importTask.tags : existing.tags,
      });
      updated++;
    } else {
      // Create new task in first column
      const columns = json.columns || [];
      const targetCol = columns[0]?.id || 'todo';
      taskStore.createTask(projectId, targetCol, importTask.title, {
        description: importTask.description,
        priority: importTask.priority || 'medium',
        tags: importTask.tags || [],
        bbosTaskType: importTask.bbosTaskType,
        bbosStage: importTask.bbosStage,
        bbosFieldData: importTask.bbosFieldData || {},
        gLabel: importTask.gLabel,
      });
      created++;
    }
  }

  return { updated, created };
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export interface Task {id: string; title: string; description: string; status: TaskStatus; assignee: {id: string; name: string}; dueDate: string; priority: 'low' | 'medium' | 'high'}

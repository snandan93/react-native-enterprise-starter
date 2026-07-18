import type {ApiResult} from '../../../types/api';
import type {Task} from '../types';
let tasks: Task[] = [
  {id: 't1', title: 'Security review', description: 'Review mobile authentication and token lifecycle.', status: 'in-progress', assignee: {id: 'u1', name: 'Aarav Sharma'}, dueDate: '2026-07-24', priority: 'high'},
  {id: 't2', title: 'Accessibility audit', description: 'Validate labels, focus order, and dynamic type.', status: 'todo', assignee: {id: 'u2', name: 'Meera Patel'}, dueDate: '2026-07-28', priority: 'medium'},
  {id: 't3', title: 'Release 1.0', description: 'Prepare release notes and production builds.', status: 'done', assignee: {id: 'u3', name: 'Kabir Singh'}, dueDate: '2026-07-18', priority: 'high'},
];
const wait = () => new Promise<void>(resolve => setTimeout(resolve, 300));
export const tasksApi = {
  async list(): Promise<ApiResult<Task[]>> {await wait(); return {success: true, data: [...tasks]};},
  async get(id: string): Promise<ApiResult<Task>> {await wait(); const task = tasks.find(item => item.id === id); return task ? {success: true, data: task} : {success: false, error: {code: 'NOT_FOUND', message: 'Task not found.', status: 404, retryable: false}};},
  async save(input: Omit<Task, 'id'> & {id?: string}): Promise<ApiResult<Task>> {await wait(); const saved: Task = {...input, id: input.id ?? `t${Date.now()}`}; tasks = input.id ? tasks.map(item => item.id === input.id ? saved : item) : [saved, ...tasks]; return {success: true, data: saved};},
};

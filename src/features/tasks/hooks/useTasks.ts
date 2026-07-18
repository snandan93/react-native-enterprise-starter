import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {tasksApi} from '../api/tasksApi';
import type {Task} from '../types';
const keys = {all: ['tasks'] as const, detail: (id: string) => ['tasks', id] as const};
export const useTasks = () => useQuery({queryKey: keys.all, queryFn: async () => {const result = await tasksApi.list(); if (!result.success) throw result.error; return result.data;}, staleTime: 30_000});
export const useTask = (id: string) => useQuery({queryKey: keys.detail(id), queryFn: async () => {const result = await tasksApi.get(id); if (!result.success) throw result.error; return result.data;}});
export const useSaveTask = () => {const client = useQueryClient(); return useMutation({mutationFn: async (task: Omit<Task, 'id'> & {id?: string}) => {const result = await tasksApi.save(task); if (!result.success) throw result.error; return result.data;}, onSuccess: task => {client.setQueryData(keys.detail(task.id), task); void client.invalidateQueries({queryKey: keys.all});}});};

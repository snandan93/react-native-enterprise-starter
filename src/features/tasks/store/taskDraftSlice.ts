import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface TaskDraft {id?: string; title: string; description: string; assignee: string; status: 'todo' | 'in-progress' | 'done'}
const initialState: {draft: TaskDraft | null} = {draft: null};
const slice = createSlice({name: 'taskDraft', initialState, reducers: {saveDraft: (state, action: PayloadAction<TaskDraft>) => {state.draft = action.payload;}, clearDraft: state => {state.draft = null;}}});
export const taskDraftActions = slice.actions;
export default slice.reducer;

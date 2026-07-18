import {configureStore} from '@reduxjs/toolkit';
import auth from '@features/auth/store/authSlice';
import taskDraft from '@features/tasks/store/taskDraftSlice';
export const store = configureStore({reducer: {auth, taskDraft}});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

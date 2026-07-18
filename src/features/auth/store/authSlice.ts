import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Session, User} from '../types';

interface AuthState {status: 'restoring' | 'authenticated' | 'anonymous'; user: User | null; session: Session | null}
const initialState: AuthState = {status: 'restoring', user: null, session: null};
const slice = createSlice({name: 'auth', initialState, reducers: {
  restored: (state, action: PayloadAction<Session | null>) => {state.session = action.payload; state.user = action.payload?.user ?? null; state.status = action.payload ? 'authenticated' : 'anonymous';},
  signedIn: (state, action: PayloadAction<Session>) => {state.session = action.payload; state.user = action.payload.user; state.status = 'authenticated';},
  signedOut: state => {state.session = null; state.user = null; state.status = 'anonymous';},
}});
export const authActions = slice.actions;
export default slice.reducer;

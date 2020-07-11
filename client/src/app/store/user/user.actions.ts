import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction('[Auth] User Login', props<{ user: Partial<User> }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const logout = createAction('[Auth] User Logut');

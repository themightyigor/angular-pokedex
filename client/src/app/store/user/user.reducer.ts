import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from 'src/app/models/user.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const featureName = 'user';

export interface UserState extends EntityState<User> {
  needAuth: boolean;
  selectedId?: string;
  error?: any;
}
export const adapter = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  needAuth: false,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state) => {
    return { ...state, needAuth: true };
  }),
  on(UserActions.loginSuccess, (state, { user }) => {
    return adapter.addOne(user, { ...state, needAuth: false });
  }),
  on(UserActions.loginFailure, (state, { error }) => {
    return { ...state, needAuth: true, error };
  }),
  on(UserActions.logout, (state) => {
    return { ...state, needAuth: true };
  })
);

export function userReducer(state: UserState, action: Action): UserState {
  return reducer(state, action);
}

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/models/user.model';

export const featureName = 'user';

export interface State extends EntityState<User> {
  needAuth: boolean;
  selectedId?: string;
  error?: any;
}

export const adapter = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  needAuth: false,
});

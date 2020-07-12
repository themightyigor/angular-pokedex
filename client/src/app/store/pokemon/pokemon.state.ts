import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Pokemon } from 'src/app/models/pokemon.model';

export const featureName = 'pokemon';

export interface State extends EntityState<Pokemon> {
  loading: boolean;
  selectedId?: string;
  error?: any;
}

export const adapter = createEntityAdapter<Pokemon>({
  selectId: (pokemon: Pokemon) => pokemon._id,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
});

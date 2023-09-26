// movie.actions.ts
import { createAction, props } from '@ngrx/store';

export const getMovies = createAction('SET_MOVIES', props<{ movies: {}[] }>());


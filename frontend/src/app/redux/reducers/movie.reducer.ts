// movie.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { MovieState } from '../app.state';
import * as MovieActions from '../actions/movie.actions';

export const initialState: MovieState = {
  movies: []
};

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.getMovies, (state, { movies }) => ({
    ...state,
    movies
  }))
);

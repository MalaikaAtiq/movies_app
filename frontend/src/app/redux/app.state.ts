// app.state.ts
export interface AppState {
  movies: MovieState;
  user: UserState
}

export interface MovieState {
  movies: {}[];
}

export interface UserState {
  user: {}
}
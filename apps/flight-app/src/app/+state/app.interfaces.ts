import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-store.interfaces';

export interface App {
  count: number;
}

export interface AppState {
  readonly app: App;
  readonly router: RouterReducerState<RouterStateUrl>;
}



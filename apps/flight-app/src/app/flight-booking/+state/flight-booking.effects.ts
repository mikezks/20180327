import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import { FlightsLoadAction, FlightsLoadedAction } from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {
  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}

  @Effect()
  flightLoad = this.actions$.pipe(
    filter(a => a instanceof FlightsLoadAction),
    switchMap( (a: FlightsLoadAction) => this.flightService.find(a.from, a.to, a.urgent) ),
    map(flights => new FlightsLoadedAction(flights))
  );
}

import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  FLIGHTS_LOAD = '[FlightBooking] Flights load',
  FLIGHTS_LOADED = '[FlightBooking] Flights loaded',
  FLIGHT_UPDATE = '[FlightBooking] Flight update'
}

// This one is used later
export class FlightsLoadAction {
  readonly type = FlightBookingActionTypes.FLIGHTS_LOAD;
  constructor(readonly from: string, readonly to: string, readonly urgent: boolean) {
  }
}

export class FlightsLoadedAction {
  readonly type = FlightBookingActionTypes.FLIGHTS_LOADED;
  constructor(readonly flights: Flight[]) {
  }
}

export class FlightUpdateAction {
  readonly type = FlightBookingActionTypes.FLIGHT_UPDATE;
  constructor(readonly flight: Flight) {
  }
}

export type FlightBookingAction =
  FlightsLoadAction |
  FlightsLoadedAction |
  FlightUpdateAction;


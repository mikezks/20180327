import {FlightBooking} from './flight-booking.interfaces';
import { FlightBookingAction, FlightBookingActionTypes } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';

export function flightBookingReducer(state: FlightBooking, action: FlightBookingAction): FlightBooking {
  switch (action.type) {
    case FlightBookingActionTypes.FLIGHTS_LOADED: {
      return { flights: action.flights };
    }
    case FlightBookingActionTypes.FLIGHT_UPDATE: {
      let idx = state.flights.findIndex(f => f.id == action.flight.id);

      let newArray: Flight[] = [
        ...state.flights.slice(0, idx),
        action.flight,
        ...state.flights.slice(idx+1)
      ];
      return { flights: newArray };
    }
    default: {
      return state;
    }
  }
}

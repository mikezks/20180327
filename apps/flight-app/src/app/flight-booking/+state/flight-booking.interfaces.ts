import { Flight } from '@flight-workspace/flight-api';

export interface FlightBooking {
  flights: Flight[]
}

export interface FlightBookingState {
  readonly flightBooking: FlightBooking;
}

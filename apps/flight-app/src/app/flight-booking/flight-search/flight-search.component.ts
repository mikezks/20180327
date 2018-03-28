import {Component, OnInit} from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { EventService } from '../../event.service';
import { Observable } from 'rxjs/Observable';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { FlightsLoadAction, FlightsLoadedAction, FlightUpdateAction } from '../+state/flight-booking.actions';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  flights$: Observable<Flight[]>;

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService,
    private eventService: EventService,
    private store: Store<FlightBookingState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.select(s => s.flightBooking.flights)
      .pipe(
        tap((flights) => console.log('Flights from Store', flights))
      );
  }

  search(): void {
    if (!this.from || !this.to) return;

    // Old:
    this.flightService
      .load(this.from, this.to, this.urgent);

    // New:
    /*this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe(
        flights => {
          this.store.dispatch(new FlightsLoadedAction(flights));
        },
        error => {
          console.error('error', error);
        }
      );*/

    // Newest
    this.store.dispatch(new FlightsLoadAction(this.from, this.to, this.urgent));
  }

  delay(): void {
    // old:
    //this.flightService.delay();

    // new:
    this.flights$.pipe(take(1)).subscribe(flights => {
      let flight = flights[0];

      let oldDate = new Date(flight.date);
      let newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      let newFlight = { ...flight, date: newDate.toISOString() };

      this.store.dispatch(new FlightUpdateAction(newFlight));
    });
  }

  select(f: Flight, selected: boolean): void {
    this.basket[f.id] = selected;
    this.eventService.publishFlight(f);
  }
}

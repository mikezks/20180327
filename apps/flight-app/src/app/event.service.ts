import { Injectable } from '@angular/core';
import { Flight } from 'libs/flight-api/index';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class EventService {

  private flightSelectedSubject = new ReplaySubject<Flight>(3);
  readonly flightSelected$: Observable<Flight> = this.flightSelectedSubject.asObservable();

  constructor() { }

  publishFlight(flight: Flight): void {
    this.flightSelectedSubject.next(flight);
  }
}

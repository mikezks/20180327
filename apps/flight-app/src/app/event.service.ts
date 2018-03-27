import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Observable } from "rxjs/Observable";
import { Flight } from "@flight-workspace/flight-api";

@Injectable()
export class EventService {

  private flightSelectedSubject = new ReplaySubject<Flight>(3);
  readonly flightSelected$: Observable<Flight> = this.flightSelectedSubject.asObservable();

  constructor() { }

  publishFlight(flight: Flight): void {
    this.flightSelectedSubject.next(flight);
  }

}

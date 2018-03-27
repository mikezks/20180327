import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Flight } from '@flight-workspace/flight-api';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {
  flights: Flight[] = [];
  onDestroy$ = new Subject<void>();

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.flightSelected$.takeUntil(this.onDestroy$).subscribe(f => {
      console.log(f);
      if (!f) return;

      this.flights.unshift(f);
      if (this.flights.length > 3) {
        this.flights.pop();
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

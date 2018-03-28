import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  online$: Observable<boolean>;
  flights$: Observable<Flight[]>;
  loading: boolean;
  online: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.control = new FormControl();

    this.online$ = interval(2000).pipe(
        startWith(0),
        map(x => Math.random() < 0.5),
        distinctUntilChanged(),
        tap(x => this.online = x)
      );

    this.flights$ =
      this.control
        .valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter(v => v.length >= 3),
          combineLatest(this.online$),
          filter(combine => combine[1]),
          tap(input => this.loading = true),
          switchMap(input => this.load(input[0])),
          tap(v => this.loading = false)
        );
  }

  load(from: string):Observable<Flight[]> {
    //let url = "http://www.angular.at/api/flight";
    let url = '/assets/data/data.json';

    let params = new HttpParams()
      .set('from', from);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
}

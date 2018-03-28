import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { Flight, FlightService } from '@flight-workspace/flight-api';

@Component({
  selector: 'app-flight-dynamic-search',
  templateUrl: './flight-dynamic-search.component.html',
  styleUrls: ['./flight-dynamic-search.component.css']
})
export class FlightDynamicSearchComponent implements OnInit {
  public filter: FormGroup = new FormGroup({});
  public formMetadata = [
    {
      name: 'from',
      label: 'Airport of departure',
      initValue: 'Wien'
    },
    {
      name: 'to',
      label: 'Airport of destination',
      initValue: 'Zürich'
    }
  ];

  get flights() {
    return this.flightService.flights;
  }

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    for(let item of this.formMetadata) {
      this.filter.addControl(
        item.name,
        new FormControl(item.initValue)
      );
    }
  }

  search(): void {
    this.flightService
      .load(
        this.filter.controls[this.formMetadata[0].name].value,
        this.filter.controls[this.formMetadata[1].name].value,
        false
      );
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Flight, FlightService } from '@flight-workspace/flight-api';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;
  editForm: FormGroup;
  flight: Flight;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flightService: FlightService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.editForm = this.fb.group({
      id:   [1],
      from: [],
      to:   [],
      date: []
    });

    this.flightService.findById(this.id).subscribe(flight => {
      this.flight = flight;

      const { delayed, ...flightNoDelayed } = flight;
      this.editForm.setValue({
        /*id: this.flight.id,
        from: this.flight.from,
        to: this.flight.to,
        date: this.flight.date*/
        ...flightNoDelayed
      });
    });

    this.editForm.valueChanges.subscribe(v => {
      console.log('changes', v);
    });
  }
}

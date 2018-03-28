import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDynamicSearchComponent } from './flight-dynamic-search.component';

describe('FlightDynamicSearchComponent', () => {
  let component: FlightDynamicSearchComponent;
  let fixture: ComponentFixture<FlightDynamicSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDynamicSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDynamicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppState } from '../+state/app.interfaces';
import { Store } from '@ngrx/store';
import { IncreaseByAction } from '../+state/app.actions';
import { Observable } from 'rxjs/Observable';
import { getCount } from '../+state/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  count$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    /*this.count$ = this.store.select(state => state.app.count);*/
    this.count$ = this.store.select(getCount);
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!'
  }

  logout(): void {
    this._userName = '';
  }

  countUp() {
    this.store.dispatch(new IncreaseByAction(1));
  }
}

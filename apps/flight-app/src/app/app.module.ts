import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import {FlightApiModule} from '@flight-workspace/flight-api';

import {AppComponent} from './app.component';
import {APP_EXTRA_OPTIONS, APP_ROUTES} from './app.routes';
import {BasketComponent} from './basket/basket.component';
import {FlightBookingModule} from './flight-booking/flight-booking.module';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import { EventService } from './event.service';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CustomRouterStateSerializer } from './+state/router-store.interfaces';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,
    FlightApiModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    StoreModule.forRoot(
      { app: appReducer, router: routerReducer },
      { initialState: { app: appInitialState, router: undefined } }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    EventService,
    AppEffects,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

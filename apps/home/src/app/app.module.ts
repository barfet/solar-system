import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlanetsList } from './components/planets-list.component';
import { AppConfigModule } from './app-config.module';
import { reducers, reducerFactory, State, getPlanetsState } from './state/reducer';
import { PlanetsEffects } from './state/planets/effects';
import * as ngrxStore from '@ngrx/store';
import * as ngrxEffects from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PlanetsFetchAction } from './state/planets/actions';

const PlanetsApiUrl = process.env.PLANETS_API_BASE_URL;

export function initConfiguration(store: ngrxStore.Store<State>): Function {
  return () =>  store.dispatch(new PlanetsFetchAction());
}

@NgModule({
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    PlanetsList
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfiguration,
      deps: [ngrxStore.Store],
      multi: true
    }
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppConfigModule,
    ngrxStore.StoreModule.forRoot(reducers, { reducerFactory }),
    ngrxEffects.EffectsModule.forRoot([
      PlanetsEffects
    ])
  ]
})

export class AppModule {
  
}
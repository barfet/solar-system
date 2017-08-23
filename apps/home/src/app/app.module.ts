import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppConfigModule } from './app-config.module';
import { reducers, reducerFactory, State, getPlanetsState } from './state/reducer';
import { PlanetsEffects } from './state/planets/effects';
import * as ngrxStore from '@ngrx/store';
import * as ngrxEffects from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppConfigModule,
    ngrxStore.StoreModule.forRoot(reducers, { reducerFactory }),
    ngrxEffects.EffectsModule.forRoot([
      PlanetsEffects
    ])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  
}
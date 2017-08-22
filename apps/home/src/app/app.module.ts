import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppConfigModule } from './app-config.module';
import { reducers, reducerFactory, State, getPlanetsState } from './state/reducer';
import * as ngrxStore from '@ngrx/store';
import * as ngrxEffects from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppConfigModule,
    ngrxStore.StoreModule.forRoot(reducers, { reducerFactory })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  
    constructor(
      public appRef: ApplicationRef,
      private _store: ngrxStore.Store<any>
    ) {
    }
  
    public hmrOnInit(store) {
      if (!store || !store.rootState) {
        return;
      }
  
      if (store.rootState) {
        this._store.dispatch({
          type: 'SET_ROOT_STATE',
          payload: store.rootState
        });
      }
  
      if ('restoreInputValues' in store) { store.restoreInputValues(); }
      this.appRef.tick();
      Object.keys(store).forEach((prop) => delete store[prop]);
    }
  
    public hmrOnDestroy(store) {
      const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
      this._store.take(1).subscribe((s) => store.rootState = s);
      store.disposeOldHosts = createNewHosts(cmpLocation);
      store.restoreInputValues = createInputTransfer();
      removeNgStyles();
    }
  
    public hmrAfterDestroy(store) {
      store.disposeOldHosts();
      delete store.disposeOldHosts;
    }
  }

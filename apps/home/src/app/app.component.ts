import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/reducer';

import { Observable } from 'rxjs/Observable';
import { SimplePlanetInfo } from './types'
import { PlanetsFetchAction } from './state/planets/actions';

import '../styles/app.scss';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;
  private planets: Observable<SimplePlanetInfo[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    console.log("dispatching!");
    this.store.dispatch(new PlanetsFetchAction());
  }

  public getCards(){

  }
}

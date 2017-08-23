import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Http } from '@angular/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { State, getPlanetsState } from './state/reducer';
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
  private planets: SimplePlanetInfo[];
  test: any;

  constructor(private store: Store<State>, public http: Http) {
  }

  ngOnInit(): void {
    this.store.dispatch(new PlanetsFetchAction());

    this.store.subscribe((state: State) => {
            this.planets = getPlanetsState(state).planets;
        });
  }

  public getCards(){

  }
}

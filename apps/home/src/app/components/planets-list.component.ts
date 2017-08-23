import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Http } from '@angular/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { State, getPlanetsState } from '.././state/reducer';
import { SimplePlanetInfo } from '.././types'

@Component({
    selector: 'planets-list',
    template: `
        <div *ngFor="let planet of planets">{{ planet.name }}</div>
    `
})

export class PlanetsList implements OnInit {

    private planets: SimplePlanetInfo[];

    constructor(private store: Store<State>, private http: Http) {

     }

    ngOnInit() {
        this.store.subscribe((state: State) => {
            this.planets = getPlanetsState(state).planets;
        });
     }
}
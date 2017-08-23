import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State, getPlanetsState } from '.././state/reducer';
import { PlanetInfo } from '.././types'

@Component({
    selector: 'planets-list',
    template: `
        <expandable-list *ngFor="let planet of planets">
            <expandable-list-item>
                <span title>{{ planet.name }}</span>
                <a item>Mass: {{ planet.mass }}</a>
                <a item>Diameter: {{ planet.diameter }}</a>
                <a item>Distance: {{ planet.distance }}</a>
                <a item>Position: {{ planet.position }}</a>
                
            </expandable-list-item>
        </expandable-list>
    `
})
//<img item src="{{planet.image}}" />
export class PlanetsList implements OnInit {

    private planets: PlanetInfo[];

    constructor(private store: Store<State>) {

     }

    ngOnInit() {
        this.store.subscribe((state: State) => {
            this.planets = getPlanetsState(state).planets;
        });
     }
}
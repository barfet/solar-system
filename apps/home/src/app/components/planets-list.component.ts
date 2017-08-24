import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State, getPlanetsState } from '.././state/reducer';
import { PlanetInfo } from '.././types'

@Component({
    selector: 'planets-list',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <expandable-list *ngFor="let planet of planets">
                        <expandable-list-item (click)="onItemClick(planet.image)" [isExpanded]="planet.isExpanded">
                            <span title>{{ planet.name }}</span>
                            <a item>Mass: {{ planet.mass }}</a>
                            <a item>Diameter: {{ planet.diameter }}</a>
                            <a item>Distance: {{ planet.distance }}</a>
                            <a item>Position: {{ planet.position }}</a>
                        </expandable-list-item>
                    </expandable-list>
                </div>
                <div class="col-md-6">
                    <img src="{{planetImage}}" />
                </div>
            </div>
        </div>
    `,
    styles: [`
        .expandable-list * {
            background: black;
            color: gray;
        }

        .expandable-list .expandable-list-item * {
            color: gray;
        }
    `]
})

export class PlanetsList implements OnInit {

    private planets: PlanetInfo[];
    private planetImage: string;

    constructor(private store: Store<State>) {

     }

    ngOnInit() {
        this.store.subscribe((state: State) => {
            this.planets = getPlanetsState(state).planets;
            this.planets.forEach(planet => planet.isExpanded = false);
        });
     }

     onItemClick(planet: PlanetInfo){
        if(planet.isExpanded){
            this.planetImage = planet.image;
        } else {
            this.planetImage = "";
        }
        
     }
}
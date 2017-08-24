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
                        <expandable-list-item (click)="onItemClick(planet)" [isExpanded]="planet.isExpanded">
                            <span title>{{ planet.name }}</span>
                            <a item>{{ planet.description }}</a>
                            <hr item/>
                            <a item>Position to the Sun - {{ planet.position }}</a>
                            <a item>Mass is approximately {{ planet.mass }} trillion metric tons </a>
                            <a item>Average diameter - {{ planet.diameter }} km </a>
                            <a item>Average Distance to the Sun - {{ planet.distance }} million km </a>
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
            this.planets = getPlanetsState(state).planets
                .sort((p1, p2) => p1.position - p2.position);
            this.planets.forEach(planet => planet.isExpanded = false);
        });
     }

     onItemClick(planet: PlanetInfo){
        planet.isExpanded = !planet.isExpanded;

        this.togglePlanets(planet);

        if (planet.isExpanded){
            this.planetImage = planet.image;
        } else {
            this.planetImage = "";
        }
        
     }

     private togglePlanets(planet: PlanetInfo){
        this.planets.forEach(p => {
            if (p.position != planet.position && p.isExpanded){
                p.isExpanded = false;
            }
        });
     }
}
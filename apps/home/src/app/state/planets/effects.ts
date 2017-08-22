import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import * as planetsActions from './actions';
import { AuthedHttp } from '@ipreo/northstar';
import { APP_CONFIG, AppConfig } from '../../app-config.module';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class FeaturesEffects {

    @Effect() public loadPlanets$ =
    this.actions$
        .ofType(planetsActions.PLANETS_FETCH)
        .switchMap((action) =>
            this.http
                .get(`${this.config.planetsApiUrl}/api/planets`)
                .map((res) => new planetsActions.PlanetsFetchSuccessAction(res.json()))
                .catch((e) => Observable.of(new planetsActions.PlanetsFetchErrorAction(e.toString())))
        );

    constructor(
        private http: Http,
        @Inject(APP_CONFIG) private config: AppConfig,
        private actions$: Actions) {
    }
}

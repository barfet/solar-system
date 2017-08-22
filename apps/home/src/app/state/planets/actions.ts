import { Action } from '@ngrx/store';
import { PlanetsStateResponse } from './state';

export const PLANETS_FETCH = '[home] Fetch Planets';
export const PLANETS_FETCH_SUCCESS = '[home] Fetch Planets Success';
export const PLANETS_FETCH_ERROR = '[home] Fetch Planets Error';

/* tslint:disable:max-classes-per-file */

export class PlanetsFetchAction implements Action {
    public readonly type = PLANETS_FETCH;
}

export class PlanetsFetchSuccessAction implements Action {
    public readonly type = PLANETS_FETCH_SUCCESS;

    constructor(public payload: PlanetsStateResponse) { }
}

export class PlanetsFetchErrorAction implements Action {
    public readonly type = PLANETS_FETCH_ERROR;

    constructor(public payload: string) { }
}

export type Actions
    = PlanetsFetchAction
    | PlanetsFetchSuccessAction
    | PlanetsFetchErrorAction;

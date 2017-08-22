import { ActionReducer, combineReducers, compose } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { SET_ROOT_STATE } from './setRootStateAction';

import { PlanetsState } from './planets/state';

import { planetsReducer } from './planets/planetsReducer';

export interface State {
    planets: PlanetsState;
    routerReducer: fromRouter.RouterReducerState;
}

export const reducers = {
    planets: planetsReducer,
    routerReducer: fromRouter.routerReducer
};

const stateSetter = (reducer) => {
    return (state, action) => {
        if (action.type === SET_ROOT_STATE) {
            return action.payload;
        }
        return reducer(state, action);
    };
};

export const reducerFactory = compose(
    stateSetter,
    combineReducers
);

export const getPlanetsState = (state: State) => state.planets;

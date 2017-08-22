import * as planetsActions from './actions';
import { PlanetsState } from './state';

export const INITIAL_STATE: PlanetsState = {
    planets: []
};

export function planetsReducer(state = INITIAL_STATE, action: planetsActions.Actions) {
    switch (action.type) {
        case planetsActions.PLANETS_FETCH_SUCCESS:
            return Object.assign({}, state, {
                planets: action.payload.solarSystemPlanets,
            });

        case planetsActions.PLANETS_FETCH_ERROR:
            return INITIAL_STATE;

        default:
            return state;
    }
}

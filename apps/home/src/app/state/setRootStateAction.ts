import { Action } from '@ngrx/store';

export const SET_ROOT_STATE: string = '[app] Set Root State';

export class SetRootStateAction implements Action {
    public readonly type = SET_ROOT_STATE;
    constructor(public payload: any) { }
}

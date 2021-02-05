import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setUser = createAction('[Auth Component] Set User', props<{user: User}>());
export const unsetUser = createAction('[Auth Component] Unset User');
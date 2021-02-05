import { Action, createReducer, on } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';
import { setItems, unsetItems } from './income-expense.actions';

export interface State {
    items: IncomeExpense[]; 
}

export const initialState: State = {
   items: [],
}

const _incomeExpenseReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items: [...items] })),
    on(unsetItems, (state) => ({ ...state, items: [] })),
);

export function incomeExpenseReducer(state: State | undefined, action: Action) {
    return _incomeExpenseReducer(state, action);
}
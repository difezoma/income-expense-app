import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const setItems = createAction('[Income-Expense Component] Set Items', props<{items: IncomeExpense[] }>());
export const unsetItems = createAction('[Income-Expense Component] Unset Items');
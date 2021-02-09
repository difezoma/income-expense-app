import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderIncomeExpensePipe } from '../pipes/order-income-expense.pipe';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { StatisticComponent } from './statistic/statistic.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';

@NgModule({
  declarations: [
    IncomeExpenseComponent,
    StatisticComponent,
    DetailComponent,
    OrderIncomeExpensePipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomesExpenses', incomeExpenseReducer),
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IncomeExpenseModule { }

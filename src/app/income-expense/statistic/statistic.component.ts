import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';

import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIncome } from '../income-expense.reducer';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {

  incomes: number = 0;
  expenses: number = 0;

  incomesTotal: number = 0;
  expensesTotal: number = 0;

  public doughnutChartLabels: Label[] = ['Incomes', 'Expenses'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store:Store<AppStateWithIncome>) { }

  ngOnInit(): void {
    this.store.select('incomesExpenses')
    .subscribe(
      ({ items }) => {
        this.generateStatistic(items);
      }
    )
  }

  generateStatistic(items: IncomeExpense[]){

    this.incomesTotal = 0;
    this.expensesTotal = 0;

    this.incomes = 0;
    this.expenses = 0;

    for (const item of items) {

      if(item.type === 'income'){
        this.incomes++;
        this.incomesTotal += item.amount;
      }else{
        this.expenses++;
        this.expensesTotal += item.amount;
      }
      
    }

    this.doughnutChartData = [[this.incomesTotal, this.expensesTotal]]

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';
import { AppStateWithIncome } from '../income-expense.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  incomesExpenses: IncomeExpense[] = [];
  incomesExpensesSubscription: Subscription = new Subscription;

  constructor(private store:Store<AppStateWithIncome>, private incomeExpenseService: IncomeExpenseService) { }
  
  ngOnInit(): void {
    this.incomesExpensesSubscription = this.store.select('incomesExpenses').subscribe(
      ({items}) => {
        this.incomesExpenses = items;
      }
      );
    }
    
  ngOnDestroy(): void {
    this.incomesExpensesSubscription.unsubscribe();
  }

  delete(uid: string | undefined){
    this.incomeExpenseService.deleteIncomeExpense(uid)
    .then(() => Swal.fire('Delete', 'Delete Success', 'success'))
    .catch(err => Swal.fire('Error', err.message, 'error'));
  }
}

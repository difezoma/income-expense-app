import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../income-expense/income-expense.actions';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  authSuscription: Subscription = new Subscription;
  incomesExpensesSuscription: Subscription= new Subscription;

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) { }
  
  ngOnInit(): void {
    
    this.authSuscription = this.store.select('auth')
    .pipe(
      filter(({user}) => user !== null)
      )
      .subscribe(
        ({user}) => {
          console.log(user);

          this.incomesExpensesSuscription = this.incomeExpenseService.initIncomesExpensesListener(user?.uid)
          .subscribe(
            incomesExpenses => {
              this.store.dispatch(setItems({items: incomesExpenses}));
            }
          )

        }
        );
      }
      
  ngOnDestroy(): void {
    this.incomesExpensesSuscription.unsubscribe();
    this.authSuscription.unsubscribe();
  }

  }
    
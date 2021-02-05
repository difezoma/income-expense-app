import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeExpense } from '../models/income-expense.model';
import { IncomeExpenseService } from '../services/income-expense.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: [
  ]
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  incomeExpenseForm: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  loadingSubscription: Subscription = new Subscription;

  constructor(private fb: FormBuilder, 
              private incomeExpenseService: IncomeExpenseService,
              private store: Store<AppState>) {

    this.incomeExpenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

   }

   
  ngOnInit(): void {
     this.loadingSubscription = this.store.select('ui')
     .subscribe(state => this.isLoading = state.isLoading);
    }
    
  ngOnDestroy(): void {
      this.loadingSubscription.unsubscribe();
    }

  save(){

    this.store.dispatch(isLoading());

    if(this.incomeExpenseForm.invalid){
      return;
    }
    console.log(this.incomeExpenseForm.value);

    const {description, amount} = this.incomeExpenseForm.value;

    const incomeExpense = new IncomeExpense(description, amount, this.type);
    this.incomeExpenseService.createIncomeExpense(incomeExpense)
    .then( () => {
      Swal.fire('Register Created', description, 'success');
      this.incomeExpenseForm.reset();
      this.store.dispatch(stopLoading());
    })
    .catch(err => {
      Swal.fire('Error', description, 'error');
      this.store.dispatch(stopLoading());
    });
  }

}

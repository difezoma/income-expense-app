import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  createIncomeExpense(incomeExpense: IncomeExpense){
    const uid = this.authService.user.uid;

    delete incomeExpense.uid;

    return this.firestore.doc(`${uid}/incomes-expenses`)
      .collection('items')
      .add({...incomeExpense});
  }

  initIncomesExpensesListener(uid: string | undefined){

    return this.firestore.collection(`${uid}/incomes-expenses/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => snapshot.map( doc => 
          ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        )
      )
    );

  }

  deleteIncomeExpense(uidItem: string | undefined){
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/incomes-expenses/items/${uidItem}`).delete();
  }

}

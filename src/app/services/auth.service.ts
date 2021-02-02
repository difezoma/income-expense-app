import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription;

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState> ) { }

  initAuthListener(){

    this.auth.authState.subscribe( firebaseUser => {

      if(firebaseUser){

        this.userSubscription = this.firestore.doc(`${ firebaseUser.uid }/user`)
        .valueChanges()
        .subscribe( (firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this.store.dispatch(authActions.setUser({user: user}));
        });


      }else{

        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
        
      }
    });
  }

  createUser(name: string, email: string, password: string){
    console.log({name,email,password});
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
              const newUser = new User(user?.uid, name, user!.email);

              return this.firestore.doc(`${ user?.uid }/user`).set({...newUser});
            });
  }

  loginUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(){
    return this.auth.signOut();
  }

  isAuthenticated(){
    return this.auth.authState
    .pipe(
      map( firebaseUser => firebaseUser != null )
    );
  }

}

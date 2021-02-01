import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore ) { }

  initAuthListener(){
    this.auth.authState.subscribe( firebaseUser => console.log(firebaseUser));
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private store: Store<AppState>) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

   }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('Loading subs');
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUser(){
    console.log(this.loginForm.value);

    this.store.dispatch(isLoading());

    /* Swal.fire({
      title: 'Loading!',
      didOpen: () => {
        Swal.showLoading();
      }
    }); */

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(credentials => {
        //Swal.close();
        this.store.dispatch(stopLoading());
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      });
  }

}

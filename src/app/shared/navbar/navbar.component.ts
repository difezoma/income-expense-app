import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  username: string | undefined = "";
  authSubscription: Subscription = new Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(({user}) => this.username = user?.username);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}

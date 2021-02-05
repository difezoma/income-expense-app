import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  username: string | undefined = "";
  authSubscription: Subscription = new Subscription;

  constructor(private authService:AuthService, private router: Router, private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(({user}) => this.username = user?.username);
  }
    
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(){
    this.authService.logoutUser()
      .then(() => this.router.navigate(['/login']));
  }

}

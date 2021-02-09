import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canLoad(): Observable<boolean>{
    return this.authService.isAuthenticated()
    .pipe(
      tap(state => {
        if(!state) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuthenticated()
    .pipe(
      tap(state => {
        if(!state) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
  
}

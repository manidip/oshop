import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from './../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
    ) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> { 
    return this.auth.appUser$.pipe(
      map(appUser => {
        if(appUser.isAdmin)
          return true;
          this.router.navigate(['/restricted'], { queryParams: {returnUrl: state.url}});
      } )
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../../shared/services/user/user.service';

@Injectable()
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

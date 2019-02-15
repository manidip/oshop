import { CanActivate, Router } from '@angular/router';
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

  canActivate(): Observable<boolean> {
    return of(true);
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin )
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../../models/app-user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) {

    this.user$ = afAuth.authState;
   }

  login() {

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
     () => {
      this.user$.subscribe(user => {
        if (user) {
          this.userService.save(user);
        }
      });
       this.router.navigate([returnUrl]);
      },
      (err) => {
        alert('Unable To Login');
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
          if (user) {
            return this.userService.get(user.uid);
          }
            return of(null);
      } )
    );
  }
}

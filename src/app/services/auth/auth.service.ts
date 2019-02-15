import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';

@Injectable({
  providedIn: 'root'
})
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

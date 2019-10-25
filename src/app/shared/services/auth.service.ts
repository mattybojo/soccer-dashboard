import { UserData } from './../models/user-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { convertSnap } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: BehaviorSubject<UserData> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    const self = this;
    this.afAuth.authState.pipe(
      switchMap(auth => {
        if (auth) {
          return self.getUserData(auth.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe((user: UserData) => {
      self.user$.next(user);
    });
  }

  getUser(): UserData {
    return this.user$.value;
  }

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(map(userData => (userData) ? userData.isAdmin : false));
  }

  isLoggedIn(): boolean {
    return this.user$.value != null;
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  saveUserData(user: firebase.User, isNewUser: boolean): Observable<DocumentReference> {
    const self = this;
    let userData: UserData = new UserData();
    if (user) {
      userData = this.setUserData(userData, user);
      if (isNewUser) {
        return from(this.db.collection('userData').add({ ...userData }));
      } else {
        this.getUserData(user.uid).subscribe((dbUserData: UserData) => {
          const newData: UserData = self.setUserData(dbUserData, user);
          self.user$.next(newData);
          self.db.doc(`userData/${newData.id}`).update(newData);
        });
      }
    }
  }

  private getUserData(uid: string): Observable<UserData> {
    return this.db.collection('userData', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map(snap => convertSnap<UserData>(snap))
      );
  }

  private setUserData(userData: UserData, user: firebase.User) {
    userData.email = userData.email || user.email;
    userData.emailVerified = userData.emailVerified || user.emailVerified;
    userData.name = userData.name || user.displayName;
    userData.photoUrl = userData.photoUrl || user.photoURL;
    userData.uid = userData.uid || user.uid;
    userData.phoneNumber = userData.phoneNumber || user.phoneNumber;
    userData.isAdmin = userData.isAdmin || false;

    return userData;
  }
}

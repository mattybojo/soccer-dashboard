import { UserData } from './../models/user-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnap } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  saveUserData(user: firebase.User, isNewUser: boolean): Observable<DocumentReference> {
    let userData: UserData = new UserData();
    if (user) {
      userData = this.setUserData(userData, user);
      if (isNewUser) {
        return from(this.db.collection('userData').add({ ...userData }));
      } else {
        this.db.collection('userData', ref => ref.where('uid', '==', user.uid))
        .snapshotChanges()
        .pipe(
          map(snap => convertSnap<UserData>(snap))
        ).subscribe((dbUserData: UserData) => {
          this.setUserData(dbUserData, user);
        });
      }
    }
  }

  private setUserData(userData: UserData, user: firebase.User) {
    userData.email = userData.email || user.email;
    userData.emailVerified = userData.emailVerified || user.emailVerified;
    userData.name = userData.name || user.displayName;
    userData.photoUrl = userData.photoUrl || user.photoURL;
    userData.uid = userData.uid || user.uid;
    userData.phoneNumber = userData.phoneNumber || user.phoneNumber;
    userData.isAdmin = false;

    window.localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  }

  getUserAuth(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isLoggedIn(): boolean {
    const storage = window.localStorage.getItem('user');
    return (null != this.user) || (storage ? storage.length > 0 : false);
  }

  logout() {
    window.localStorage.removeItem('user');
    this.afAuth.auth.signOut();
  }
}

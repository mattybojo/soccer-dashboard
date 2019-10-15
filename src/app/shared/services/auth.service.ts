import { UserData } from './../models/user-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnap } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  saveUserData(user: firebase.User, isNewUser: boolean): Observable<DocumentReference> {
    let userData: UserData = new UserData();
    if (user) {
      userData = this.setUserData(userData, user);
      if (isNewUser) {
        return from(this.db.collection('userData').add({ ...userData }));
      } else {
        this.getUserData(user.uid).subscribe((dbUserData: UserData) => {
          const newData: UserData = this.setUserData(dbUserData, user);
          this.db.doc(`userData/${newData.id}`).update(newData);
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

    window.localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  }

  isAdmin(): Observable<boolean> {
    const storedUser = window.localStorage.getItem('user');
    const uid = storedUser ? JSON.parse(storedUser).uid : null;
    if (null == uid) {
      return of(false);
    }
    return this.getUserData(uid)
      .pipe(
        map(userData => userData.isAdmin)
      );
  }

  getUserAuth(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isLoggedIn(): boolean {
    const storedUser = window.localStorage.getItem('user');
    return (null != this.afAuth.auth.currentUser) || (storedUser ? storedUser.length > 0 : false);
  }

  logout(): void {
    window.localStorage.removeItem('user');
    this.afAuth.auth.signOut();
  }
}

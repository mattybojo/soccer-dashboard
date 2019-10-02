import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Match } from '../models/match.model';
import { Observable } from 'rxjs';
import { convertSnaps } from './db-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private db: AngularFirestore) {}

  getMatch(dateString: string): Observable<Match[]> {
    return this.db.
      collection('matches', ref => ref.where('date', '==', dateString))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Match>(snaps))
      );
  }

  getLatestMatch(): Observable<Match[]> {
    return this.db
      .collection('matches', ref => ref.orderBy('date', 'desc').limit(1))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Match>(snaps))
      );
  }

  getMatches(): Observable<Match[]> {
    return this.db
      .collection('matches', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Match>(snaps))
      );
  }
}

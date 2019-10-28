import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Match } from '../models/match.model';
import { Observable, from } from 'rxjs';
import { convertSnaps } from './db-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private db: AngularFirestore) {}

  getMatches(): Observable<Match[]> {
    return this.db
      .collection('matches', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Match>(snaps))
      );
  }

  saveMatch(match: Match): Observable<DocumentReference> {
    return from(this.db.collection('matches').add({ ...match }));
  }
}

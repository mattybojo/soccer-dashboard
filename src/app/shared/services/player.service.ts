import { Player } from './../models/player.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private db: AngularFirestore) {}

  getPlayers(): Observable<string[]> {
    return this.db.
      collection('players')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<string>(snaps))
      );
  }

  getPlayerStats(): Observable<Player[]> {
    return this.db.
      collection('season1')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Player>(snaps))
      );
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TeamPicker } from '../models/team-picker.model';
import { Observable, from } from 'rxjs';
import { convertSnaps } from './db-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {

  constructor(private db: AngularFirestore) {}

  getTeamData(): Observable<TeamPicker[]> {
    return this.db
      .collection('teamPicker')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<TeamPicker>(snaps))
      );
  }

  saveTeamData(teamData: TeamPicker): Observable<any> {
    if (teamData.id) {
      return from(this.db.doc(`teamPicker/${teamData.id}`).update(Object.assign({}, teamData)));
    } else {
      return from(this.db.collection('matches').add(Object.assign({}, teamData)));
    }
  }
}

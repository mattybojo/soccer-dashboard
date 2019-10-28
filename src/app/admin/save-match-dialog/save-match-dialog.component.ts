import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchService } from 'src/app/shared/services/match.service';
import { Match } from 'src/app/shared/models/match.model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-save-match-dialog',
  templateUrl: './save-match-dialog.component.html',
  styleUrls: ['./save-match-dialog.component.scss']
})
export class SaveMatchDialogComponent implements OnInit {

  match: Match;
  isSaving: boolean = false;

  constructor(private dialogRef: MatDialogRef<SaveMatchDialogComponent>, @Inject(MAT_DIALOG_DATA) private data,
              private matchService: MatchService) {}

  ngOnInit() {
    this.match = {
      date: '',
      whiteTeam: {
        players: this.data.whiteTeam,
        goals: ''
      },
      darkTeam: {
        players: this.data.darkTeam,
        goals: ''
      },
      motm: ''
    };
  }

  saveMatch() {
    this.isSaving = true;
    this.matchService.saveMatch(this.match).subscribe((resp: DocumentReference) => {
      this.isSaving = false;
      this.dialogRef.close();
    });
  }
}

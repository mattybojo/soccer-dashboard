import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-player-name-dialog',
  templateUrl: './save-player-name-dialog.component.html',
  styleUrls: ['./save-player-name-dialog.component.scss']
})
export class SavePlayerNameDialogComponent implements OnInit {

  dialogTitle: string;
  dialogInputLabel: string;
  playerName: string;

  constructor(private dialogRef: MatDialogRef<SavePlayerNameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit() {
    this.dialogTitle = this.data.dialogTitle;
    this.dialogInputLabel = this.data.dialogInputLabel;
  }

  setPlayerName() {
    this.dialogRef.close(this.playerName);
  }
}

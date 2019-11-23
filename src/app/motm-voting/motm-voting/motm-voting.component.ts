import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { TeamPicker, MotmVotesList } from 'src/app/shared/models/team-picker.model';
import { TeamPickerService } from 'src/app/shared/services/team-picker.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SavePlayerNameDialogComponent } from 'src/app/admin/save-player-name-dialog/save-player-name-dialog.component';
import { UserData } from 'src/app/shared/models/user-data.model';

@Component({
  selector: 'app-motm-voting',
  templateUrl: './motm-voting.component.html',
  styleUrls: ['./motm-voting.component.scss']
})
export class MotmVotingComponent implements OnInit {

  darkTeamPlayers: string[];
  whiteTeamPlayers: string[];
  selectedPlayer: string;
  isSaving: boolean = false;
  teamData$: Observable<TeamPicker[]>;
  motmVotesList: MotmVotesList;

  savePlayerNameDialogRef: MatDialogRef<SavePlayerNameDialogComponent>;

  constructor(private teamPickerService: TeamPickerService, private snackBar: MatSnackBar,
              private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const MotmVotesList$ = this.teamPickerService.getMotmVotes();

    obsArray.push(teamData$);
    obsArray.push(MotmVotesList$);

    combineLatest(obsArray).subscribe(obs => {
      const pickerData = obs[0][0];
      this.motmVotesList = obs[1];

      this.darkTeamPlayers = pickerData.darkTeam.split(',');
      this.whiteTeamPlayers = pickerData.whiteTeam.split(',');
    });
  }

  selectPlayer(player: string) {
    if (this.selectedPlayer === player) {
      this.selectedPlayer = null;
    } else {
      this.selectedPlayer = player;
    }
  }

  submitVote() {
    const self = this;

    let userName: string;
    const userData: UserData = this.authService.getUser();
    if (userData) {
      userName = userData.name.split(' ')[0];
      this.saveVote(userName);
    } else {
      this.savePlayerNameDialogRef = this.dialog.open(SavePlayerNameDialogComponent, {
        data: {
          dialogTitle: 'Verify Your Vote',
          dialogInputLabel: 'Enter your name'
        }
      });

      this.savePlayerNameDialogRef.afterClosed().subscribe(result => {
        if (result) {
          self.saveVote(result);
        }
      });
    }
  }

  saveVote(userName: string) {
    const self = this;
    if (this.motmVotesList.votes === '') {
      this.motmVotesList.votes = `${userName}:${this.selectedPlayer}`;
    } else {
      this.motmVotesList.votes = this.motmVotesList.votes.concat(`,${userName}:${this.selectedPlayer}`);
    }

    this.teamPickerService.submitMotmVote(this.motmVotesList).subscribe(() => {
      self.selectedPlayer = null;
      self.snackBar.open('Thanks for voting!', null, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snackbar-formatting'
      });
    });
  }
}

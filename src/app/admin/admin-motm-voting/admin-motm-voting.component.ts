import { ViewMotmVotesDialogComponent } from './../view-motm-votes-dialog/view-motm-votes-dialog.component';
import { AuthService } from './../../shared/services/auth.service';
import { TeamPicker, MotmVotesList, MotmVote } from './../../shared/models/team-picker.model';
import { TeamPickerService } from './../../shared/services/team-picker.service';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-motm-voting',
  templateUrl: './admin-motm-voting.component.html',
  styleUrls: ['./admin-motm-voting.component.scss']
})
export class AdminMotmVotingComponent implements OnInit {

  darkTeamPlayers: string[];
  whiteTeamPlayers: string[];
  selectedPlayer: string;
  isSaving: boolean = false;
  teamData$: Observable<TeamPicker[]>;
  motmVotesList: MotmVotesList;
  faSearchPlus = faSearchPlus;

  viewMotmVotesDialogRef: MatDialogRef<ViewMotmVotesDialogComponent>;

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

  onViewVotes() {
    let motmVotes: MotmVote[] = null;
    if (this.motmVotesList.votes && this.motmVotesList.votes.length > 0) {
      motmVotes = [];
      // Process votes
      this.motmVotesList.votes.split(',').forEach((vote: string) => {
        const tokens = vote.split(':');
        motmVotes.push({ user: tokens[0], vote: tokens[1] });
      });
    }

    this.viewMotmVotesDialogRef = this.dialog.open(ViewMotmVotesDialogComponent, {
      data: {
        voteData: motmVotes
      }
    });
  }

  submitVote() {
    const self = this;

    let userName: string = this.authService.getUser().name;
    if (userName) {
      userName = userName.split(' ')[0];
    }

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

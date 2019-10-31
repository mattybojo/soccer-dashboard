import { TeamPicker, MotmVote } from './../../shared/models/team-picker.model';
import { TeamPickerService } from './../../shared/services/team-picker.service';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material';

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
  motmVote$: Observable<MotmVote>;
  motmVote: MotmVote;

  constructor(private teamPickerService: TeamPickerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const motmVote$ = this.teamPickerService.getMotmVotes();

    obsArray.push(teamData$);
    obsArray.push(motmVote$);

    combineLatest(obsArray).subscribe(obs => {
      const pickerData = obs[0][0];
      this.motmVote = obs[1];

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
    if (this.motmVote.votes === '') {
      this.motmVote.votes = this.selectedPlayer;
    } else {
      this.motmVote.votes = this.motmVote.votes.concat(`,${this.selectedPlayer}`);
    }
    this.teamPickerService.submitMotmVote(this.motmVote).subscribe(() => {
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

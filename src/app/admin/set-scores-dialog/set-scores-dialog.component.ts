import { Match, AdminPlayerData, Team } from 'src/app/shared/models/match.model';
import { MatchService } from 'src/app/shared/services/match.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-set-scores-dialog',
  templateUrl: './set-scores-dialog.component.html',
  styleUrls: ['./set-scores-dialog.component.scss']
})
export class SetScoresDialogComponent implements OnInit {

  matchData: Match;
  isSaving: boolean;
  darkTeamData: AdminPlayerData[];
  whiteTeamData: AdminPlayerData[];
  darkTeamScore: number;
  whiteTeamScore: number;

  constructor(private dialogRef: MatDialogRef<SetScoresDialogComponent>, @Inject(MAT_DIALOG_DATA) private data,
              private matchService: MatchService) { }

  ngOnInit() {
    let goals: number;
    this.matchData = this.data.matchData;

    this.isSaving = false;
    this.darkTeamData = [];
    this.whiteTeamData = [];
    this.whiteTeamScore = 0;
    this.darkTeamScore = 0;

    this.darkTeamData = this.matchData.darkTeam.players.split(',').map((playerName: string) => {
      goals = 0;
      this.matchData.darkTeam.goals.split(',').forEach((scorerName: string) => {
        if (scorerName === playerName) {
          goals++;
          this.darkTeamScore++;
        }
      });
      return { name: playerName, goals: goals };
    });

    this.whiteTeamData = this.matchData.whiteTeam.players.split(',').map((playerName: string) => {
      goals = 0;
      this.matchData.whiteTeam.goals.split(',').forEach((scorerName: string) => {
        if (scorerName === playerName) {
          goals++;
          this.whiteTeamScore++;
        }
      });
      return { name: playerName, goals: goals };
    });
  }

  calculateDarkTeamScore() {
    this.darkTeamScore = this.calculateTeamScore(this.darkTeamData);
  }

  calculateWhiteTeamScore() {
    this.whiteTeamScore = this.calculateTeamScore(this.whiteTeamData);
  }

  calculateTeamScore(data: AdminPlayerData[]): number {
    let score: number = 0;
    data.forEach((entry: AdminPlayerData) => {
      score += entry.goals;
    });
    return score;
  }

  formatTeamData(teamPlayerData: AdminPlayerData[]): Team {
    let teamData: Team = new Team();
    let playerString: string = '';
    let goalString: string = '';
    let i: number;
    teamPlayerData.forEach((player: AdminPlayerData) => {
      playerString = playerString.concat(`,${player.name}`);
      for(i = 0; i < player.goals; i++) {
        goalString = goalString.concat(`,${player.name}`);
      }
    });
    teamData.players = playerString.substr(1);
    teamData.goals = goalString.substr(1);
    return teamData;
  }

  onSubmit() {
    this.isSaving = true;
    const self = this;
    this.matchData.darkTeam = this.formatTeamData(this.darkTeamData);
    this.matchData.whiteTeam = this.formatTeamData(this.whiteTeamData);
    this.matchService.getMatchByDate(this.matchData.date).subscribe((match: Match) => {
      self.matchData.id = match.id;
      self.matchService.updateMatch(self.matchData).subscribe(() => {
        self.isSaving = false;
        self.dialogRef.close();
      });
    });
  }
}

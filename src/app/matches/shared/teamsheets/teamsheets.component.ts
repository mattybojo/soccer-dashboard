import { MatchPlayer } from './../../../shared/models/match.model';
import { Match } from 'src/app/shared/models/match.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faFutbol, faCrown } from '@fortawesome/free-solid-svg-icons';
import { faCuttlefish } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'efl-teamsheets',
  templateUrl: './teamsheets.component.html',
  styleUrls: ['./teamsheets.component.scss']
})
export class TeamsheetsComponent implements OnInit {

  faFutbol = faFutbol;
  faCrown = faCrown;
  faCuttlefish = faCuttlefish;

  @ViewChild('whiteTeamSort', {static: true}) whiteTeamSort: MatSort;
  @ViewChild('darkTeamSort', {static: true}) darkTeamSort: MatSort;

  whiteTeamDataSource: MatTableDataSource<MatchPlayer>;
  darkTeamDataSource: MatTableDataSource<MatchPlayer>;

  whiteTeamData: MatchPlayer[] = [];
  darkTeamData: MatchPlayer[] = [];

  whiteTeamColumns: string[] = ['name', 'goals'];
  darkTeamColumns: string[] = ['goals', 'name'];

  whiteTeamGoals: number = 0;
  darkTeamGoals: number = 0;

  @Input() set matchData(data: Match) {
    if (data) {
      let isCaptain: boolean;
      let isMotm: boolean;

      this.resetMatchData();

      data.whiteTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.whiteTeamData.push({ name: player, goals: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      data.darkTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.darkTeamData.push({ name: player, goals: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      if (data.whiteTeam.goals) {
        data.whiteTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.whiteTeamData.find(x => x.name === goal).ownGoals += 1;
          } else {
            this.whiteTeamData.find(x => x.name === goal).goals += 1;
          }
          this.whiteTeamGoals++;
        });
      }

      if (data.darkTeam.goals) {
        data.darkTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.darkTeamData.find(x => x.name === goal).ownGoals += 1;
          } else {
            this.darkTeamData.find(x => x.name === goal).goals += 1;
          }
          this.darkTeamGoals++;
        });
      }

      this.whiteTeamDataSource = new MatTableDataSource(this.whiteTeamData);
      this.whiteTeamDataSource.sort = this.whiteTeamSort;

      this.darkTeamDataSource = new MatTableDataSource(this.darkTeamData);
      this.darkTeamDataSource.sort = this.darkTeamSort;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  parseTokens(str: string): string[] {
    return str.split(',');
  }

  resetMatchData() {
    this.whiteTeamData = [];
    this.darkTeamData = [];

    this.whiteTeamGoals = 0;
    this.darkTeamGoals = 0;
  }
}
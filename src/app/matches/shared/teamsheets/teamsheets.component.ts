import { MatchPlayer, PenaltyTaker } from './../../../shared/models/match.model';
import { Match } from 'src/app/shared/models/match.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faFutbol, faCrown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCuttlefish, faAdn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'efl-teamsheets',
  templateUrl: './teamsheets.component.html',
  styleUrls: ['./teamsheets.component.scss']
})
export class TeamsheetsComponent implements OnInit {

  faFutbol = faFutbol;
  faCrown = faCrown;
  faTimes = faTimes;
  faCuttlefish = faCuttlefish;
  faAdn = faAdn;

  @ViewChild('whiteTeamSort', {static: true}) whiteTeamSort: MatSort;
  @ViewChild('darkTeamSort', {static: true}) darkTeamSort: MatSort;

  whiteTeamDataSource: MatTableDataSource<MatchPlayer>;
  darkTeamDataSource: MatTableDataSource<MatchPlayer>;

  whiteTeamPenaltyDataSource: MatTableDataSource<PenaltyTaker>;
  darkTeamPenaltyDataSource: MatTableDataSource<PenaltyTaker>;

  whiteTeamData: MatchPlayer[] = [];
  darkTeamData: MatchPlayer[] = [];

  whiteTeamPenaltyData: PenaltyTaker[] = [];
  darkTeamPenaltyData: PenaltyTaker[] = [];

  darkTeamColumns: string[];
  darkTeamColumnsS1: string[] = ['name', 'goals'];
  darkTeamColumnsS2: string[] = ['name', 'goals', 'assists'];

  whiteTeamColumns: string[];
  whiteTeamColumnsS1: string[] = ['goals', 'name'];
  whiteTeamColumnsS2: string[] = ['assists', 'goals', 'name'];

  darkTeamPenaltyColumns: string[] = ['name', 'scored'];
  whiteTeamPenaltyColumns: string[] = ['scored', 'name'];

  whiteTeamGoals: number = 0;
  darkTeamGoals: number = 0;

  whiteTeamPenalties: number = 0;
  darkTeamPenalties: number = 0;

  @Input() set matchData(data: Match) {
    if (data) {
      let isCaptain: boolean;
      let isMotm: boolean;
      let penaltyData: string[];
      let isPenaltyScored: boolean;

      this.resetMatchData();

      // Parse player data
      data.whiteTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.whiteTeamData.push({ name: player, goals: 0, assists: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      data.darkTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.darkTeamData.push({ name: player, goals: 0, assists: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      // Parse goal data
      if (data.whiteTeam.goals) {
        data.whiteTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.darkTeamData.find(x => x.name === goal.split(' ')[0]).ownGoals += 1;
          } else {
            this.whiteTeamData.find(x => x.name === goal).goals += 1;
          }
          this.whiteTeamGoals++;
        });
      }

      if (data.darkTeam.goals) {
        data.darkTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.whiteTeamData.find(x => x.name === goal.split(' ')[0]).ownGoals += 1;
          } else {
            this.darkTeamData.find(x => x.name === goal).goals += 1;
          }
          this.darkTeamGoals++;
        });
      }

      // Parse assist data
      if (data.whiteTeam.assists) {
        data.whiteTeam.assists.split(',').forEach((assist: string) => {
          this.whiteTeamData.find(x => x.name === assist).assists += 1;
        });
      }

      if (data.darkTeam.assists) {
        data.darkTeam.assists.split(',').forEach((assist: string) => {
          this.darkTeamData.find(x => x.name === assist).assists += 1;
        });
      }

      // Determine which cols to use
      if (!data.darkTeam.assists && !data.whiteTeam.assists) {
        // season 1 cols
        this.darkTeamColumns = this.darkTeamColumnsS1;
        this.whiteTeamColumns = this.whiteTeamColumnsS1;
      } else {
        this.darkTeamColumns = this.darkTeamColumnsS2;
        this.whiteTeamColumns = this.whiteTeamColumnsS2;
      }

      this.whiteTeamDataSource = new MatTableDataSource(this.whiteTeamData);
      this.whiteTeamDataSource.sort = this.whiteTeamSort;

      this.darkTeamDataSource = new MatTableDataSource(this.darkTeamData);
      this.darkTeamDataSource.sort = this.darkTeamSort;

      // Parse penalty data, if exists
      if (data.whiteTeam.penalties && data.darkTeam.penalties) {
        data.whiteTeam.penalties.split(',').forEach((penalty: string) => {
          penaltyData = penalty.split(':');
          isPenaltyScored = (penaltyData[1] === 'Y') ? true : false;
          this.whiteTeamPenalties += (isPenaltyScored) ? 1 : 0;
          this.whiteTeamPenaltyData.push({ name: penaltyData[0], scored: isPenaltyScored });
        });

        data.darkTeam.penalties.split(',').forEach((penalty: string) => {
          penaltyData = penalty.split(':');
          isPenaltyScored = (penaltyData[1] === 'Y') ? true : false;
          this.darkTeamPenalties += (isPenaltyScored) ? 1 : 0;
          this.darkTeamPenaltyData.push({ name: penaltyData[0], scored: isPenaltyScored });
        });

        this.whiteTeamPenaltyDataSource = new MatTableDataSource(this.whiteTeamPenaltyData);
        this.darkTeamPenaltyDataSource = new MatTableDataSource(this.darkTeamPenaltyData);
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  resetMatchData() {
    this.whiteTeamData = [];
    this.darkTeamData = [];

    this.whiteTeamGoals = 0;
    this.darkTeamGoals = 0;

    this.whiteTeamPenalties = 0;
    this.darkTeamPenalties = 0;

    this.whiteTeamPenaltyData = [];
    this.darkTeamPenaltyData = [];
  }
}

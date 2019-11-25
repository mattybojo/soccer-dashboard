import { PlayerStats } from './../../shared/models/player.model';
import { PlayerService } from './../../shared/services/player.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  statsDataSource: MatTableDataSource<PlayerStats>;
  columns: string[] = [];
  columnsS1: string[] = ['name', 'gamesPlayed', 'wins', 'captainWins', 'winPct', 'goals', 'ownGoals', 'cleanSheets'];
  columnsS2: string[] = ['name', 'gamesPlayed', 'wins', 'captainWins', 'winPct', 'goals', 'assists', 'ownGoals', 'cleanSheets'];
  seasonOptions: KeyValue<string, string>[] = [{key: 'Season 2', value: 'season2'}, {key: 'Season 1', value: 'season1'}];
  selectedSeason: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.selectedSeason = 'season2';
    this.getPlayerStatsBySeason();
  }

  getPlayerStatsBySeason() {
    this.playerService.getPlayerStats(this.selectedSeason).subscribe((resp: PlayerStats[]) => {
      resp = this.calculateWinPct(resp);

      if (this.selectedSeason === 'season1') {
        this.columns = this.columnsS1;
      } else {
        this.columns = this.columnsS2;
      }

      this.statsDataSource = new MatTableDataSource(resp);
      this.statsDataSource.sort = this.sort;
    });
  }

  calculateWinPct(stats: PlayerStats[]): PlayerStats[] {
    stats.forEach((stat: PlayerStats) => {
      stat.winPct = (stat.wins / stat.gamesPlayed) * 100;
    });
    return stats;
  }
}

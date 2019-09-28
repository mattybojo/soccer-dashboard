import { Player } from './../../shared/models/player.model';
import { PlayerService } from './../../shared/services/player.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  statsDataSource: MatTableDataSource<Player>;
  columns: string[] = ['name', 'wins', 'captainWins', 'goals', 'ownGoals'];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayerStats().subscribe((resp: Player[]) => {
      this.statsDataSource = new MatTableDataSource(resp);
      this.statsDataSource.sort = this.sort;
    });
  }
}

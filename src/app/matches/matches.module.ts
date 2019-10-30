import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches/matches.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { TeamsheetsComponent } from './shared/teamsheets/teamsheets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MatchesComponent, TeamsheetsComponent],
  imports: [
    MatchesRoutingModule,
    CommonModule,
    MatTableModule,
    MatGridListModule,
    MatSortModule,
    MatSelectModule,
    FontAwesomeModule
  ],
  exports: [
    TeamsheetsComponent
  ]
})
export class MatchesModule { }

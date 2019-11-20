import { MatchesModule } from './../matches/matches.module';
import { TeamPickerModule } from './../team-picker/team-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminMatchesComponent } from './admin-matches/admin-matches.component';
import { MatSelectModule } from '@angular/material/select';
import { SetScoresDialogComponent } from './set-scores-dialog/set-scores-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SaveMatchDialogComponent } from './save-match-dialog/save-match-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SavePlayerNameDialogComponent } from './save-player-name-dialog/save-player-name-dialog.component';

@NgModule({
  declarations: [
    AdminTeamPickerComponent,
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    AdminMatchesComponent,
    AdminMotmVotingComponent,
    SavePlayerNameDialogComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    TeamPickerModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatSelectModule,
    MatchesModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule
  ],
  entryComponents: [SaveMatchDialogComponent, SetScoresDialogComponent, SaveMatchDialogComponent, SavePlayerNameDialogComponent]
})
export class AdminModule { }

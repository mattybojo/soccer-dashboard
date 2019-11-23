import { AdminModule } from './../admin/admin.module';
import { SavePlayerNameDialogComponent } from './../admin/save-player-name-dialog/save-player-name-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MotmVotingComponent } from './motm-voting/motm-voting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotmVotingRoutingModule } from './motm-voting-routing.module';

@NgModule({
  declarations: [MotmVotingComponent],
  imports: [
    CommonModule,
    MotmVotingRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    AdminModule
  ],
  exports: [],
  entryComponents: [SavePlayerNameDialogComponent]
})
export class MotmVotingModule { }

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
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [AdminTeamPickerComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    TeamPickerModule,
    FontAwesomeModule,
    MatTooltipModule
  ]
})
export class AdminModule { }

import { MatButtonModule } from '@angular/material/button';
import { TeamPickerComponent } from './team-picker/team-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPickerRoutingModule } from './team-picker-routing.module';
import { ChatComponent } from './shared/chat/chat.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TeamPickerComponent, ChatComponent],
  imports: [
    TeamPickerRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  ]
})
export class TeamPickerModule { }

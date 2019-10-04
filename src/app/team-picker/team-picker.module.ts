import { MatButtonModule } from '@angular/material/button';
import { TeamPickerComponent } from './team-picker/team-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPickerRoutingModule } from './team-picker-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChatComponent } from './shared/chat/chat.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeamPickerComponent, ChatComponent],
  imports: [
    TeamPickerRoutingModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ]
})
export class TeamPickerModule { }

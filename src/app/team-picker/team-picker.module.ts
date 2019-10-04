import { TeamPickerComponent } from './team-picker/team-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPickerRoutingModule } from './team-picker-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [TeamPickerComponent],
  imports: [
    TeamPickerRoutingModule,
    CommonModule,
    DragDropModule
  ]
})
export class TeamPickerModule { }

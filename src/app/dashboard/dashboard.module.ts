import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MatTableModule,
    MatGridListModule,
    MatSortModule,
    MatSelectModule,
  ]
})
export class DashboardModule { }

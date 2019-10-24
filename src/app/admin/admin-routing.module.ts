import { AdminGuard } from './../shared/guards/admin.guard';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: 'team-picker',
  component: AdminTeamPickerComponent,
  canActivate: [AdminGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule {}

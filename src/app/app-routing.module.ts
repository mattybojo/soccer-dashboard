import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule'
}, {
  path: 'matches',
  loadChildren: './matches/matches.module#MatchesModule'
}, {
  path: 'team-picker',
  loadChildren: './team-picker/team-picker.module#TeamPickerModule'
}, {
  path: 'auth',
  loadChildren: './auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: './admin/admin.module#AdminModule'
}, {
  path: 'changelog',
  loadChildren: './changelog/changelog.module#ChangelogModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

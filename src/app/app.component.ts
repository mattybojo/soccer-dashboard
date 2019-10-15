import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from './shared/models/menu.model';
import { faTable, faFutbol, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Estadio Fallon Liga';
  menuItems: MenuItem[] = [];
  faTable = faTable;
  faFutbol = faFutbol;
  faUsers = faUsers;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.menuItems.push({ label: 'Dashboard', link: '/dashboard', icon: faTable});
    this.menuItems.push({ label: 'Matches', link: '/matches', icon: faFutbol, queryParams: {date: 'latest'}});
    this.menuItems.push({ label: 'Team Picker', link: '/team-picker', icon: faUsers});
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/dashboard');
  }
}

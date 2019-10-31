import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from './shared/models/menu.model';
import { faTable, faFutbol, faUsers, faClipboardList, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Estadio Fallon Liga';
  menuItems: MenuItem[] = [];
  adminMenuItems: MenuItem[] = [];
  faTable = faTable;
  faFutbol = faFutbol;
  faUsers = faUsers;
  faClipboardList = faClipboardList;
  faStar = faStar;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.menuItems.push({ label: 'Dashboard', link: '/dashboard', icon: faTable });
    this.menuItems.push({ label: 'Matches', link: '/matches', icon: faFutbol, queryParams: {date: 'latest'} });
    this.menuItems.push({ label: 'Team Picker', link: '/team-picker', icon: faUsers });
    this.menuItems.push({ label: 'Changelog', link: '/changelog', icon: faClipboardList });

    this.authService.isAdmin().subscribe((isAdmin: boolean) => {
      if (isAdmin) {
        this.adminMenuItems = [];
        this.adminMenuItems.push({ label: 'Matches', link: '/admin/matches', icon: faFutbol });
        this.adminMenuItems.push({ label: 'Team Picker', link: '/admin/team-picker', icon: faUsers });
        this.adminMenuItems.push({ label: 'MOTM', link: '/admin/motm', icon: faStar });
      }
    });
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/dashboard');
  }
}

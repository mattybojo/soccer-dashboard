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

  ngOnInit(): void {
    this.menuItems.push({ label: 'Dashboard', link: '/dashboard', icon: faTable});
    this.menuItems.push({ label: 'Matches', link: '/matches', icon: faFutbol, queryParams: {date: 'latest'}});
    this.menuItems.push({ label: 'Team Picker', link: '/team-picker', icon: faUsers});
  }
}

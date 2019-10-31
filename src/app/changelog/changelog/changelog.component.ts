import { AuthService } from './../../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { ChangelogService } from './../../shared/services/changelog.service';
import { Component, OnInit } from '@angular/core';
import { Changelog } from 'src/app/shared/models/changelog.model';
import { groupBy, orderBy } from 'lodash';
import * as moment from 'moment'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  formattedLogs: any[];
  logs$: Observable<Changelog[]>;
  objectKeys: any;

  constructor(private changelogService: ChangelogService, private authService: AuthService) { }

  ngOnInit() {
    const self = this;
    this.logs$ = this.changelogService.getLogs().pipe(
      tap((logs: Changelog[]) => {
        this.objectKeys = Object.keys;
        this.authService.isAdmin().subscribe((isAdmin: boolean) => {
          let filteredLogs = logs;
          if (!isAdmin) {
            // Filter logs based on whether user is admin or not
            filteredLogs = logs.filter((log: Changelog) => {
              return log.type !== 'admin';
            });
          }
          const sortedLogs = orderBy(filteredLogs, (log: Changelog) => {
            return moment(log.date.toDate()).format();
          }, 'desc');
          self.formattedLogs = groupBy(sortedLogs, (log: Changelog) => {
            return moment(log.date.toDate()).startOf('day').format('MM-DD-YYYY');
          });
        });
      })
    );
  }

}

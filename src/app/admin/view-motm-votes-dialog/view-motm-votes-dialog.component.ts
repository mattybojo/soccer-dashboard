import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-motm-votes-dialog',
  templateUrl: './view-motm-votes-dialog.component.html',
  styleUrls: ['./view-motm-votes-dialog.component.scss']
})
export class ViewMotmVotesDialogComponent implements OnInit {

  sortedVoteData: any;
  data: any;

  constructor(private dialogRef: MatDialogRef<ViewMotmVotesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private _data) { }

  ngOnInit() {
    this.data = this._data
    this.sortedVoteData = _(this.data.voteData)
      .groupBy(data => data.vote)
      .map((data, vote) => ({ vote: vote, count: data.length, voters: _.map(data, 'user').join(', ') }))
      .orderBy(group => group.count, ['desc'])
      .value();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'ng-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public historyDialog: MatDialogRef<HistoryComponent>,
  ) { }
  logs: any;
  dateTimeFormat = {
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'am/pm'
  };

  ngOnInit(): void {
    this.logs = this.data?.logs;
  }

  closeDialog(): void {
    this.historyDialog.close();
  }

}

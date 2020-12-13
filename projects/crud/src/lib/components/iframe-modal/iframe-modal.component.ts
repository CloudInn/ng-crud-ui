import { Component, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-crud-iframe-modal',
  templateUrl: './iframe-modal.component.html',
  styleUrls: ['./iframe-modal.component.css']
})
export class IframeModalComponent implements OnInit {
  src: any;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public iframeDialog: MatDialogRef<IframeModalComponent>,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.src);
    this.title = this.data.title;
  }

  closeDialog() {
    this.iframeDialog.close();
  }
}

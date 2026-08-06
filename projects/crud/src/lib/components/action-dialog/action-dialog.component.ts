import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ActionDialogComponent>) { }

  dialogAction(option: string){
    this.dialogRef.close(option);
  }
}

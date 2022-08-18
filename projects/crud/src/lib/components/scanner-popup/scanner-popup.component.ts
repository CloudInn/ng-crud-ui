import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'scanner-popup',
  templateUrl: './scanner-popup.component.html',
  styleUrls: ['./scanner-popup.component.css']
})
export class ScannerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ScannerComponent>) { }

  dialogAction(option: string){
    this.dialogRef.close(option);
  }
}

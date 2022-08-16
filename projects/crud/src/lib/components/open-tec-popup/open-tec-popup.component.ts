import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ng-open-tec-popup',
  templateUrl: './open-tec-popup.component.html',
  styleUrls: ['./open-tec-popup.component.css']
})
export class OpenTecPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public options: any,
    public dialogRef: MatDialogRef<OpenTecPopupComponent>) { }

  ngOnInit() { 
    console.log("dataaaaa", this.options);
    
  }

  dialogAction(option: string){
    this.dialogRef.close(option);
  }


}

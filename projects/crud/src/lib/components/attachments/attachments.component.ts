import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'ng-crud-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  constructor() { }

  @Input() formGroup;
  @Input() config;
  attachments: Array<any> = [];
  attachments_delete = new Array();
  allowedTypes = ['PDF', 'Doc', 'Docx', 'Xls', 'Xlsx', 'JPEG', 'GIF', 'PNG', 'BMP'];
  @ViewChild('fileInput', { static: true }) fileInput: FileUploadComponent;
  attachments_service_conatiner = new Array();
  get formControls() { return this.formGroup.controls as any; }

  ngOnInit(): void {
    this.subscribeToFormChanges();
  }


  subscribeToFormChanges() {
    this.formGroup.get(this.config.name).valueChanges.subscribe(files => {
      if (files !== null && this.formGroup.get(this.config.name).valid) {
        for (let i = 0; i < files.length; i++) {
          this._handleReaderLoaded(files[i]);
        }
      }
    });
  }

  _handleReaderLoaded(file) {
    if (this.ifFileExsits(this.attachments, file)) {
      this.formGroup.get(this.config.name).setErrors({ fileExsist: true });
    } else {
      this.addFile(file);
    }
  }

  ifFileExsits(attachments = [], file) {
    let addedAttachment;
    if (attachments.length > 0) {
      addedAttachment = attachments.find(attachment =>
        (attachment.name.includes('.') ? this.splitFile(attachment).name : attachment.name)
        === this.splitFile(file).name &&
        attachment.extension === this.splitFile(file).extension);
    }
    if (addedAttachment) {
      return true;
    } else {
      return false;
    }
  }

  addFile(file) {
    this.attachments.push({
      name: this.splitFile(file).name,
      extension: this.splitFile(file).extension,
      file: file
    });
    // this.store.dispatch(new UpdateNewReservation({ toUploadFiles: this.attachments }));
    this.attachments_service_conatiner.push(file);
    //  this.attacmentsService.attachmentsFormData = this.attachments_service_conatiner;
    //  this.formGroup.reset();
    this.fileInput.deleteFile();
  }

  splitFile(file) {
    const splilted = file.name.split('.');
    const length = splilted.length;
    const extension = splilted[length - 1].toLowerCase();
    splilted.length = length - 1;
    const name = splilted.join('.');
    return { extension: extension, name: name };
  }


  deleteFile(file, index) {
    if (typeof (file.file) === 'string') { // uploaded file
      // this.store.dispatch(new UpdateNewReservation({ reservation_load: true }));
      // this.attacmentsService.deleteAttachment(this.reservation.id, file.id).subscribe(res => {
      //   this.store.dispatch(new GetNewReservation(this.reservation.id));
      // }, err => {
      //   this.store.dispatch(new UpdateNewReservation({
      //     reservation_load: false,
      //     alreadyDeleted: true
      //   }));
      //   this.snackBar.openFromComponent(SnackbarComponent, {
      //     duration: 5000,
      //     data: {
      //       message: 'Please review your reservation data and try again!',
      //       type: 'fail',
      //     }, panelClass: ['snackbar-fail']
      //   });
      // });
    } else {
      this.attachments.splice(index, 1);
      const fileIndex = this.attachments_service_conatiner.findIndex(attachment =>
        attachment.name === file.file.name);
      this.attachments_service_conatiner.splice(fileIndex, 1);
    }
    this.formGroup.get(this.config.name).reset();
    this.fileInput.deleteFile();
  }

}

import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ng-crud-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  @Input() formGroup;
  @Input() config;
  onChange: Function;
  file: File[] | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = new Array();
    for (let i = 0; i < event.length; i++) {
      file.push(event && event.item(i));
    }
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  deleteFile() {
    (<HTMLInputElement>document.getElementById('file')).value = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

}

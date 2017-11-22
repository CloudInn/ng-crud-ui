import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Registry } from '../../services';
import { Field, FieldType } from '../../forms';

@Component({
  selector: 'ngcrudui-form-field',
  template: `
  <ng-template [ngIf]="field.type === fieldType.Text">
    <mat-form-field>
        <input  matInput placeholder="{{ field.label }}" [(ngModel)]="ngModel" 
          [disabled]="disabled" [id]="'id_'+field.key" />
    </mat-form-field>
  </ng-template>
  <ng-template [ngIf]="field.type === fieldType.Number">
    <mat-form-field>
        <input  matInput type="number" placeholder="{{ field.label }}" [(ngModel)]="ngModel" 
          [name]="field.key"  [disabled]="disabled" />
    </mat-form-field>
  </ng-template>
  <ng-template [ngIf]="field.type === fieldType.Boolean">
    <mat-slide-toggle matInput [(ngModel)]="ngModel" [disabled]="disabled" >{{ field.label }}</mat-slide-toggle>
  </ng-template>
  <ng-template [ngIf]="field.type === fieldType.ForeignKey && choices[field.key]">
    <mat-form-field>
        <mat-select [name]="field.key" placeholder="{{ field.label }}" [(ngModel)]="ngModel" [disabled]="disabled">
            <mat-option></mat-option>
            <mat-option [value]="c[field.foreign_model.external_value]" *ngFor="let c of choices[field.key]">
              {{ c[field.foreign_model.external_label] }}</mat-option>
        </mat-select>
    </mat-form-field>
  </ng-template>
  `
})
export class FormFieldComponent implements OnInit {

  @Input() ngModel: any = {};
  @Input() forcedSearchParams: any = [];
  @Input() field: Field;
  @Input() disabled = false;
  @Input() choices = {};
  fieldType: typeof FieldType = FieldType;

  constructor(private api: ApiService, private reg: Registry) {
  }

   ngOnInit() {

   }
}

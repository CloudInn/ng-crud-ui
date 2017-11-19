import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Registry } from '../../services';
import { BaseField, FieldType, Field, Fieldset } from '../../forms';

@Component({
  selector: 'ngcrudui-form',
  template: `
  <ng-template [ngIf]="field.type === fieldType.Text">
    <mat-form-field>
        <input  matInput placeholder="{{ f.label }}" [(ngModel)]="ngModel[f.key]" 
            [name]="ngModel[f.key]" [disabled]="!f.is_editable" />
    </mat-form-field>
    </ng-template>
    <ng-template [ngIf]="field.type === fieldType.Number">
    <mat-form-field>
      <input  matInput type="number" placeholder="{{ f.label }}" 
        [(ngModel)]="ngModel[field.key]" [name]="ngModel[field.key]" [disabled]="!field.is_editable" />
    </mat-form-field>
    </ng-template>
    <ng-template [ngIf]="field.type === fieldType.Boolean">
    <mat-slide-toggle matInput [(ngModel)]="ngModel[f.key]">{{ f.label }}</mat-slide-toggle>
    </ng-template>
    <ng-template [ngIf]="f.type === fieldType.ForeignKey">
    <mat-form-field>
        <mat-select  placeholder="{{ f.label }}" [(ngModel)]="ngModel[f.key]" [disabled]="!f.is_editable">
            <mat-option></mat-option>
        </mat-select>
    </mat-form-field>
  </ng-template>
  `
})
export class FormComponent implements OnInit {

  public ngModel: any = {};
  public fields: BaseField[] = [];
  public _model: any;
  @Input() forcedSearchParams: any = [];
  @Input() model;

  constructor(private api: ApiService, private reg: Registry) {
  }

  ngOnInit() {
    
  }


}

import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metadata } from '../../models/metadata';

@Component({
  selector: 'ng-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  metadata: Metadata;
  @ViewChild('formView', { read: ViewContainerRef, static: false }) formView: ViewContainerRef;
  constructor(private ref: MatDialogRef<SearchDialogComponent>,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const viewConfig = this.data['viewConfig'].search.creationView;
    this.metadata = this.data['metadata'];
    const factory = this.resolver.resolveComponentFactory<any>(viewConfig.component);
    const component = this.container.createComponent(factory);
    component.instance.viewConfig = viewConfig;
    this.formView?.insert(component.hostView);
  }

  cancel(): void {
    this.ref.close();
  }
}

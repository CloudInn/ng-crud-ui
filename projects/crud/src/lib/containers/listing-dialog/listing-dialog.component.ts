import { Component, OnInit, Inject, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Metadata } from '../../models/metadata';

@Component({
  templateUrl: 'listing-dialog.component.html',
  styleUrls: ['listing-dialog.component.css']
})
export class ListingDialogComponent implements OnInit {

    metadata: Metadata;
    @ViewChild('listingView', {read: ViewContainerRef}) listingView: ViewContainerRef;

    constructor(
      private ref: MatDialogRef<ListingDialogComponent>,
      private container: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
      const viewConfig = this.data['viewConfig'];
      this.metadata = this.data['metadata'];
      // const viewConfig = new ListingView(this.metadata);
      const factory = this.resolver.resolveComponentFactory<any>(viewConfig.component);
      const component = this.container.createComponent(factory);
      component.instance.viewConfig = viewConfig;
      component.instance.mode = 'pick';
      component.instance.picked.subscribe(value => {
        this.picked(value);
      });
      this.listingView.insert(component.hostView);
    }

    picked(value) {
      this.ref.close(value);
    }

}

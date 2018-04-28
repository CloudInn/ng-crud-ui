import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { Registry } from '../../services';

@Component({
  templateUrl: 'listing.container.html',
  styleUrls: ['listing.container.css']
})
export class ListingContainer implements OnInit {

    appName: string = null;
    moduleName: string = null;
    modelName: string = null;

    constructor(
      private reg: Registry,
      private router: Router,
      private route: ActivatedRoute,
    ) {}

    ngOnInit() {
      // keep listening for route params changes, in case of
      // the model name changed, e.g: another model clicked from
      // the nav menu
      this.route.params.subscribe(params => {
        const parentParams = this.route.parent.snapshot.params;
        this.moduleName = parentParams['module'];
        this.appName = parentParams['app'];
        this.modelName = params['model_name'];
      });
    }

}

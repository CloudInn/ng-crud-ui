import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { Registry } from '../../services';

@Component({
  templateUrl: 'app-settings.component.html',
  styleUrls: ['app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {

    app: any = null;
    moduleName = null;
    models = [];

    constructor(
      private reg: Registry,
      private router: Router,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.moduleName = params['module'];
        this.app = this.reg.getApp(params['app']);
        this.models = this.reg.getAppModels(params['app']);
        if (!params['model_name']) {
          this.router.navigate(['/'+params['module'], params['app'], this.models[0].name]);
        }
      });
    }

    // ngOnChanges() {
    //   this.route.params.subscribe(params => {
    //     this.moduleName = params['parent_app'];
    //     this.app = this.reg.getApp(params['app']);
    //     this.models = this.reg.getAppModels(params['app']);
    //   });
    // }
}

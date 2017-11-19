import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Registry } from '../../services';

@Component({
  selector: 'ngcrudui-auto-complete-field',
  templateUrl: './auto-complete-field.component.html'
})
export class AutoCompleteFieldComponent implements OnInit {

  @Input() modelName: string;
  @Input() ngModel: any = {};
  @Input() forcedSearchParams: any;
  dataSource: any[] = new Array();
  searchParams: {};
  model: any;

  constructor(private api: ApiService, private reg: Registry) {
    
  }

   ngOnInit() {
      this.model = this.reg.models[this.modelName];
      if(!this.model) {
        console.error(`Failed to find model ${this.modelName}, Please register it first`);
        return;
      }
      console.log(this.model);
      this.ngModel = this.model.getModel();
      this.searchParams = {page: 1};
      this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
        this.dataSource.push(res['results']);
      });
   }

   valueFormatter(data: any): string {
      console.log(data, this.model)
      return `(${data[this.model.valueField]}) ${data[this.model.displayField]}`;
    }
}

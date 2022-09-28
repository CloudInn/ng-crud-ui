import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSelector'
})
export class GetSelectorPipe implements PipeTransform {

  transform(selector: string): string {
    return selector.toLowerCase().replace(/ /g, '-');
  }

}

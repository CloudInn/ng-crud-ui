import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: false,
  name: 'getSelector'
})
export class GetSelectorPipe implements PipeTransform {

  transform(selector: string): string {
    return selector.toLowerCase().replace(/ /g, '-');
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateTimeFormat' })
export class DateTimeFormatPipe implements PipeTransform {
    transform(value: string, format: {
        dateFormat: string,
        timeFormat: string
    }): string {
        return moment(value).
            format(`${format.dateFormat} ${format.timeFormat === 'am/pm' ? 'hh:mm:ss A' : 'HH:mm:ss'}`);
    }
}

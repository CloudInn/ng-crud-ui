import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

export const MY_FORMATS = {
    parse: { dateInput: 'DD-MM-YYYY' },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {

    public format(date: Moment, displayFormat: Object): string {
        const day = date.toDate().getDate();
        const month = date.toDate().getMonth();
        const year = date.toDate().getFullYear();
        const monthNumber = month + 1;
        const M = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
        const D = day < 10 ? `0${day}` : day;
        return `${D}-${M}-${year}`;
    }
}

import { InjectionToken, Type } from '@angular/core';

// Lets a host app swap the Material datepicker header on generated date fields,
// e.g. to overlay a Hijri calendar. Unprovided leaves Material's own header.
export const CRUD_CALENDAR_HEADER = new InjectionToken<Type<any>>('CRUD_CALENDAR_HEADER');

// Return an empty string to render no hint.
export type CrudDateHintFn = (value: any) => string;

// Companion to CRUD_CALENDAR_HEADER: renders a caption under a date field, so a
// host app can echo the value in another calendar system.
export const CRUD_DATE_HINT = new InjectionToken<CrudDateHintFn>('CRUD_DATE_HINT');

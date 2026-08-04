import { InjectionToken, Type } from '@angular/core';

// Lets a host app swap the Material datepicker header on generated date fields,
// e.g. to overlay a Hijri calendar. Unprovided leaves Material's own header.
export const CRUD_CALENDAR_HEADER = new InjectionToken<Type<any>>('CRUD_CALENDAR_HEADER');

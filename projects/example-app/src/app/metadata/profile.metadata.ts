import { Validators } from '@angular/forms';
import { Metadata, FieldConfig } from 'crud';
import { Profile } from '../models/profile.model';
import { CountryMetadata } from './country.metadata';
import { CountryListView } from '../views/country.list.view';
import { Subject } from 'rxjs';

export class ProfileMetadata implements Metadata {
    name = 'profile';
    label = 'Profiles';
    api = '/api/core/individualprofile/v3/';
    model = Profile;
    queryParams = ['name', 'nationality', 'email', 'telephone', 'mobile', 'id','passport'];
    includeParams = true;
    filter = true;
    rows = new Subject();
    listingFields = ['name', 'nationality', 'email', 'telephone', 'mobile', 'id','passport'];
    externalNameField = 'description';
    externalValueField = 'id';
    formsets = [];
    fields: FieldConfig[] = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            isEditable: true,
        },
        {
            name: 'country',
            label: 'Country ID',
            type: 'number',
            isHidden: true,
        },
        {
            name: 'individualprofilecontactinfo_set.country',
            label: 'Country',
            type: 'foreignKey',
            resolveValueFrom: 'individualprofilecontactinfo_set.country',
            control: {
                metadata: new CountryMetadata(),
                viewConfig: new CountryListView(),
            },
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'individualprofilecontactinfo_set.city',
            label: 'City',
            type: 'text',
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'nationality',
            label: 'Nationality',
            type: 'foreignKey',
            resolveValueFrom: 'country',
            control: {
                metadata: new CountryMetadata(),
                viewConfig: new CountryListView(),
            },
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            validators: [Validators.email],
            isEditable: true
        },
        {
            name: 'telephone',
            label: 'Telephone',
            type: 'text',
            validators: [Validators.pattern(/^(?=.*[0-9])[- +()0-9]+$/)],
            isEditable: true,
        },
        {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            validators: [Validators.pattern(/^(?=.*[0-9])[- +()0-9]+$/)],
            isEditable: true,
        },
        {
            name: 'id',
            label: 'ID Number',
            type: 'text',
            validators: [Validators.pattern(/^(?=.*[0-9])[- +()0-9]+$/)],
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'passport',
            label: 'Passport ID',
            type: 'text',
            isEditable: true,
        },
    ];
    formActions = {
        // unlock: (http: HttpClient, id: number) => {
        //     return http.get(`/api/pos/terminal/${id}/unlock/`).subscribe(res => {
        //         return res;
        //     });
        // }
    };
}

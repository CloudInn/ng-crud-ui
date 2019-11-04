import { Validators } from '@angular/forms';
import { Metadata, FieldConfig } from 'crud';
import { Profile } from '../models/profile.model';
import { CountryMetadata } from './country.metadata';
import { CountryListView } from '../views/country.list.view';

export class ProfileMetadata implements Metadata {
    name = 'profile';
    label = 'Profile';
    api = '/api/core/individualprofile/v3/';
    model = Profile;
    listingFields = ['name', 'country', 'city', 'nationality', 'email', 'telephone', 'mobile', 'id'];
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
            name: 'country_id',
            label: 'Country ID',
            type: 'number',
            isHidden: true,
        },
        {
            name: 'country',
            label: 'Country',
            type: 'foreignKey',
            resolveValueFrom: 'country_id',
            control: {
                metadata: new CountryMetadata(),
                viewConfig: new CountryListView(),
            },
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'nationality',
            label: 'Nationality',
            type: 'foreignKey',
            resolveValueFrom: 'country_id',
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
        }
    ];
    formActions = {
        // unlock: (http: HttpClient, id: number) => {
        //     return http.get(`/api/pos/terminal/${id}/unlock/`).subscribe(res => {
        //         return res;
        //     });
        // }
    };
}

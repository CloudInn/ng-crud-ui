import { FormView, FieldConfig } from 'crud';
import { StoreListView } from '../views/store.list.view';
import { StoreMetadata } from '../metadata/store.metadata';

export class ProfileSearchForm extends FormView {
    title = 'Search Profiles';
    layout = 'horizontal';
    controls: FieldConfig[] = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
        },
        {
            name: 'country',
            label: 'Country',
            type: 'select',
            control: {
                type: 'autocomplete',
                autocomplete: {
                    api: '/api/pos/rcrs/',
                    valueField: 'id',
                    labelFields: ['description']
                },
                multiple: false
            }
        },
        {
            name: 'nationality',
            label: 'Nationality',
            type: 'select',
            control: {
                type: 'autocomplete',
                autocomplete: {
                    api: '/api/pos/rcrs/',
                    valueField: 'id',
                    labelFields: ['description']
                },
                multiple: false
            }
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'telephone',
            label: 'Telephone',
            type: 'text'
        },
        {
            name: 'mobile',
            label: 'Mobile',
            type: 'text'
        },
        {
            name: 'id',
            label: 'ID Number',
            type: 'text'
        }
    ];

}

import { FormView, FieldConfig } from 'crud';
import { StoreListView } from '../views/store.list.view';
import { StoreMetadata } from '../metadata/store.metadata';

export class TerminalSearchForm extends FormView {
    title = 'Search Teminals';
    layout = 'horizontal';
    controls: FieldConfig[] = [

        {
            name: 'basic',
            label: 'Basic',
            type: 'fieldset',
            cssWidth: '48',
            control: {
                fields: [
                    {
                        name: 'name',
                        label: 'Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'first_name',
                        label: 'First Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'date_of_birth',
                        label: 'Date of Birth',
                        type: 'date',
                        isEditable: true,
                        iContains: true,
                        isClickable: true
                    },
                    {
                        name: 'gender',
                        label: 'Gender',
                        type: 'select',
                        control: {
                            choices: [{ description: 'Female', id: 'F' }, { description: 'Male', id: 'M' }]
                        },
                        isEditable: true
                    },
                    {
                        name: 'loyalty_points',
                        label: 'Loyalty points',
                        type: 'text',
                        isEditable: false,
                    }
                ]
            }
        },



        {
            name: 'number',
            label: 'Number',
            type: 'number',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'rcrs_number',
            label: 'RCRS',
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
            name: 'store',
            label: 'Outlet',
            type: 'foreignKey',
            isSearchable:true,
            control: {
                metadata: new StoreMetadata(),
                viewConfig: new StoreListView(),
            }
        }
    ];

}

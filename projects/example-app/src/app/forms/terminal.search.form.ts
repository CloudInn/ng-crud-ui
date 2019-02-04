import { FormView, FieldConfig } from 'crud';
import { StoreListView } from '../views/store.list.view';
import { StoreMetadata } from '../metadata/store.metadata';

export class TerminalSearchForm extends FormView {
    title = 'Search Teminals';
    layout = 'horizontal';
    controls: FieldConfig[] = [
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
            control: {
                metadata: new StoreMetadata(),
                viewConfig: new StoreListView(),
            }
        }
    ];

}

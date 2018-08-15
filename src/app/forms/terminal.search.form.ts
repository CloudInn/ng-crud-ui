import { FormView } from 'projects/crud/src/lib/models/views';
import { StoreListView } from '../views/store.list.view';
import { StoreMetadata } from '../metadata/store.metadata';

export class TerminalSearchForm extends FormView {
    layout = 'horizontal';
    controls = [
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
            type: 'string',
            control: {
                type: 'select',
                autocomplete: {
                    enabled: true,
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
            control: {
                type: 'foreignKey',
                metadata: new StoreMetadata(),
                viewConfig: new StoreListView(),
            }
        }
    ];
}

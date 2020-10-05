import { Store } from '../models/store.model';
import { Metadata, FieldConfig } from 'crud';
import { Subject } from 'rxjs';

export class StoreMetadata implements Metadata {
    name = 'store';
    label = 'Store';
    api = '/api/stores';
    model = Store;
    listingFields = ['id', 'code', 'description'];
    searchParam = 'description';
    rows = new Subject();
    optionName = 'description';
    applyFunctions = true;
    formsets = [];
    fields: FieldConfig[] = [
        {
            name: 'id',
            label: 'ID',
            type: 'number',
            isEditable: false,
        },
        {
            name: 'code',
            label: 'Code',
            type: 'number',
            isEditable: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            isEditable: true,
        },
        {
            name: 'show_paymaster',
            label: 'Show Paymaster',
            type: 'boolean',
            control: {
                type: 'switch'
            },
            isEditable: true,
        }
    ];
    formActions = [];
}

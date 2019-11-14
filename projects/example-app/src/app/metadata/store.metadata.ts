import { Store } from '../models/store.model';
import { Metadata, FieldConfig } from 'crud';
import { Subject } from 'rxjs';

export class StoreMetadata implements Metadata {
    name = 'store';
    label = 'Store';
    api = '/api/stores';
    model = Store;
    listingFields = ['id', 'code', 'description'];
    externalNameField = 'description';
    rows = new Subject();
    externalValueField = 'id';
    optionName = 'description';
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
        },
        {
            name: 'show_paymaster',
            label: 'Show Paymaster',
            type: 'boolean',
            control: {
                type: 'switch'
            }
        }
    ];
    formActions = {};
}

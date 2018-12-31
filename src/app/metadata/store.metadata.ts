import { Validators } from '@angular/forms';
import { Metadata } from 'projects/crud/src/lib/models/metadata';
import { Store } from 'src/app/models/store.model';

export class StoreMetadata implements Metadata {
    name = 'store';
    label = 'Store';
    api = '/api/pos/store/';
    model = Store;
    listingFields = ['id', 'code', 'description'];
    externalNameField = 'description';
    externalValueField = 'id';
    formsets = [];
    fields = [
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
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'show_paymaster',
            label: 'Show Paymaster',
            type: 'boolean'
        }
    ];
    formActions = {};
}

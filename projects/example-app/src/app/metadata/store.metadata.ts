import { Validators } from '@angular/forms';
import { Metadata } from 'projects/crud/src/lib/models/metadata';
import { Store } from '../models/store.model';
import { FieldConfig } from 'crud/lib/models/metadata';

export class StoreMetadata implements Metadata {
    name = 'store';
    label = 'Store';
    api = '/api/stores';
    model = Store;
    listingFields = ['id', 'code', 'description'];
    externalNameField = 'description';
    externalValueField = 'id';
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
            type: 'text'
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

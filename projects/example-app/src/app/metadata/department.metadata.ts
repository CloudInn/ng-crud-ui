import { Validators } from '@angular/forms';
import { Metadata } from 'crud';
import { Department } from '../models/department.model';

export class DepartmentMetadata implements Metadata {
    name = 'department';
    label = 'Department';
    api = '/api/departments';
    model = Department;
    listingFields = ['id', 'code', 'name'];
    externalNameField = 'name';
    externalValueField = 'id';
    fields = [
        {
            name: 'id',
            label: 'ID',
            type: 'id',
            isEditable: false,
        },
        {
            name: 'code',
            label: 'Code',
            type: 'number',
        },
        {
            name: 'name',
            label: 'Name',
        },
        {
            name: 'payment_type',
            label: 'Payment Type',
            control: {
                type: 'select',
                choices: [{label: 'Debit', value: 'debit'}, {label: 'Credit', value: 'credit'}]
            }
        }
    ];
    formsets = [];
    formActions = {};
}

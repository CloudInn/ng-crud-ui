import { Metadata, FieldConfig } from 'crud';
import { Department } from '../models/department.model';

export class DepartmentMetadata implements Metadata {
    name = 'department';
    label = 'Department';
    api = '/api/departments';
    model = Department;
    listingFields = ['id', 'code', 'name', 'payment_type'];
    searchParam = 'name';
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
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text'
        },
        {
            name: 'payment_type',
            label: 'Payment Type',
            type: 'select',
            control: {
                choices: [{label: 'test', description: 'test'},{label: 'Debit', description: 'debit'}, {label: 'Credit', description: 'credit'}]
            }
        }
    ];
    formsets = [];
    formActions = [];
}

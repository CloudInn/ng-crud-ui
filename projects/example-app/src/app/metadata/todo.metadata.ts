import { Todo } from '../models/todo.model';
import { Metadata, FieldConfig, FormsetConfig } from 'crud';


export class TodoMetadata implements Metadata {
    name = 'Todo';
    label = 'Todo';
    api = '/api/todos';
    model = Todo;
    listingFields = ['id', 'title'];
    externalNameField = 'title';
    externalValueField = 'id';
    listingActions = ['delete'];
    fields: FieldConfig[] = [
        {
            name: 'id',
            label: 'Id',
            type: 'number',
            isSearchable: true,
            isEditable: false,
        },
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            isSearchable: true,
            isEditable: true,
        },
    ];
    formsets: FormsetConfig[] = [
        {
            name: 'todoItems',
            label: 'Todo Items',
            isSearchable: false,
            isEditable: true,
            fields: [
                {
                    name: 'id',
                    label: 'Id',
                    type: 'number',
                    isSearchable: false,
                    isEditable: true,
                    isHidden: true,
                },
                {
                    name: 'content',
                    label: 'Content',
                    type: 'text',
                    isSearchable: true,
                    isEditable: true,
                },
                {
                    name: 'complete',
                    label: 'Complete',
                    type: 'boolean',
                    isSearchable: true,
                    isEditable: true,
                },
            ]
        },
        {
            name: 'todoItems2',
            label: 'Todo Items 2',
            isSearchable: false,
            isEditable: true,
            fields: [
                {
                    name: 'id',
                    label: 'Id',
                    type: 'number',
                    isSearchable: false,
                    isEditable: true,
                    isHidden: true,
                },
                {
                    name: 'contents',
                    label: 'Contents',
                    type: 'text',
                    isSearchable: true,
                    isEditable: true,
                },
                {
                    name: 'completes',
                    label: 'Completes',
                    type: 'boolean',
                    isSearchable: true,
                    isEditable: true,
                },
            ]
        },
    ];
    formActions = {};
}

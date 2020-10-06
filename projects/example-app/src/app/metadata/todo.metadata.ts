import { Todo } from '../models/todo.model';
import { Metadata, FieldConfig } from 'crud';

export class TodoMetadata implements Metadata {
  name = 'Todo';
  label = 'Todo';
  api = '/api/todos/';
  model = Todo;
  listingFields = ['id', 'title'];
  searchParam = 'title';
  listingActions = ['delete'];
  fields: FieldConfig[] = [
    {
      name: 'id',
      label: 'Id',
      type: 'number',
      isClickable: true,
      isSearchable: true,
      isEditable: false
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      isSearchable: true,
      isEditable: true
    },
    {
      name: 'todoItems',
      label: 'TODO Items',
      type: 'formset',
      control: {
        fields: [
          {
            name: 'id',
            label: 'Id',
            type: 'number',
            isSearchable: false,
            isEditable: true,
            isHidden: true
          },
          {
            name: 'content',
            label: 'Content',
            type: 'text',
            isSearchable: true,
            isEditable: true
          },
          {
            name: 'content',
            label: 'Content',
            type: 'text',
            isSearchable: true,
            isEditable: true
          },
          {
            name: 'content',
            label: 'Content',
            type: 'text',
            isSearchable: true,
            isEditable: true
          },
          {
            name: 'complete',
            label: 'Complete',
            type: 'boolean',
            isSearchable: true,
            isEditable: true
          }
        ]
      }
    }
  ];

  formActions = [];
}

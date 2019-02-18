import { Todo } from '../models/todo.model';
import { Metadata, FieldConfig } from 'crud';

export class TodoMetadata implements Metadata {
  name = 'Todo';
  label = 'Todo';
  api = '/api/todos';
  model = Todo;
  listingFields = ['id', 'title'];
  externalNameField = 'title';
  externalValueField = 'id';
  listingActions = ['delete'];
  permissions = {
    create: 'createTodo',
    read: 'readTodo',
    update: 'updateTodo',
    delete: 'deleteTodo',
  };
  fields: FieldConfig[] = [
    {
      name: 'id',
      label: 'Id',
      type: 'number',
      isSearchable: true,
      isEditable: false,
      permissions: {},
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      isSearchable: true,
      isEditable: true,
      permissions: {
        create: 'createTitle',
        read: 'readTitle',
        update: 'updateTitle',
        delete: 'deleteTitle',
      },
    },
    {
      name: 'todoItems',
      label: 'TODO Items',
      type: 'formset',
      permissions: {
        create: 'createTodoItems',
        read: 'readTodoItems',
        update: 'updateTodoItems',
        delete: 'deleteTodoItems',
      },
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
            isEditable: true,
            permissions: {
              create: 'createContent',
              read: 'readContent',
              update: 'updateContent',
              delete: 'deleteContent',
            },
          },
          {
            name: 'complete',
            label: 'Complete',
            type: 'boolean',
            isSearchable: true,
            isEditable: true,
            permissions: {
              create: 'createComplete',
              read: 'readComplete',
              update: 'updateComplete',
              delete: 'deleteComplete',
          },
          }
        ]
      }
    }
  ];

  formActions = {};
}

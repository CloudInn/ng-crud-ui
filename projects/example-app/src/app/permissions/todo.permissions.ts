import { Permissions, Permission } from 'crud';

export class TodoPermissions implements Permissions {
    permissions: Permission[] = [
        {
            name: 'Todo',
            permission: {
                create: 'createTodo',
                read: 'readTodo',
                update: 'updateTodo',
                delete: 'deleteTodo',
            },
        },
        {
            name: 'todoItems',
            permission: {
                create: 'createTodoItems',
                read: 'readTodoItems',
                update: 'updateTodoItems',
                delete: 'deleteTodoItems',
            },
        },
        {
            name: 'title',
            permission: {
                create: 'createTitle',
                read: 'readTitle',
                update: 'updateTitle',
                delete: 'deleteTitle',
            },
        },
        {
            name: 'content',
            permission: {
                create: 'createContent',
                read: 'readContent',
                update: 'updateContent',
                delete: 'deleteContent',
            },
        },
        {
            name: 'complete',
            permission: {
                create: 'createComplete',
                read: 'readComplete',
                update: 'updateComplete',
                delete: 'deleteComplete',
            },
        },
    ];
}

export class Todo {
    id: number;
    title: string;
    todoItems: TodoItem[];
}

export class TodoItem {
    id: number;
    content: string;
    complete: boolean;
    todoId: number;
}

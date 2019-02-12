import { FormView } from 'projects/crud/src/lib/models/views';

export class TodoForm extends FormView {
    layout = 'horizontal';
    controls = [
        {
            name: 'title',
            label: 'Titile'
        },
    ];
}

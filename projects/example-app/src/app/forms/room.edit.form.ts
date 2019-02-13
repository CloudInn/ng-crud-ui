import { FormView, FieldConfig } from 'crud';

export class RoomForm extends FormView {
    label = 'Rooms';
    layout = 'horizontal';
    controls: FieldConfig[] = [
        {
            name: 'number',
            label: 'Number'
        },
        {
            name: 'type',
            label: 'Type'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textArea'
        }
    ];
}

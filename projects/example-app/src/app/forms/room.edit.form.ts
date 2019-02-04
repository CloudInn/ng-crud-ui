import { FormView, FormsetConfig, FieldConfig } from 'crud';

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
    formsets: FormsetConfig[] = [
        {
            name: 'occupancy',
            label: 'Occupancy',
            fields: [
                {
                    name: 'number_of_adults',
                    label: 'Adults',
                    type: 'number'
                },
                {
                    name: 'number_of_children',
                    label: 'Children',
                    type: 'number'
                }
            ]
        }
    ];
}

import { FormView, FormsetConfig } from 'crud';

export class RoomForm extends FormView {
    label = 'Rooms';
    layout = 'horizontal';
    controls = [
        {
            name: 'number',
            label: 'Number'
        },
        {
            name: 'type',
            label: 'Type'
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

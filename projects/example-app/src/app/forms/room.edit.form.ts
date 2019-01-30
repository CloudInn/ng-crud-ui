import { FormView } from 'projects/crud/src/lib/models/views';

export class RoomForm extends FormView {
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
    formsets = [
        {
            name: 'occupancy',
            label: 'Occupancy',
            fields: [
                {
                    name: 'number_of_adults',
                    label: 'Adults',
                    control: {
                        type: 'number'
                    }
                },
                {
                    name: 'number_of_children',
                    label: 'Children',
                    control: {
                        type: 'number'
                    }
                }
            ]
        }
    ];
}

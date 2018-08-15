import { FormView } from 'projects/crud/src/lib/models/views';

export class StoreSearchForm extends FormView {
    layout = 'horizontal';
    controls = [
        {
            name: 'code',
            label: 'Code'
        },
        {
            name: 'description',
            label: 'Desc'
        },
        {
            name: 'fieldset1',
            label: 'Fieldset',
            control: {
                type: 'fieldset',
            },
            fields: [{
                name: 'show_paymaster',
                label: 'Show Paymaster',
                type: 'boolean',
                control: {
                    type: 'switch'
                }
            }]
        }
    ];
}

import { FormView, FieldConfig } from 'crud';

export class StoreSearchForm extends FormView {
    layout = 'horizontal';
    controls: FieldConfig[] = [
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
            type: 'fieldset',
            control: {
                fields: [{
                    name: 'show_paymaster',
                    label: 'Show Paymaster',
                    type: 'boolean',
                    control: {
                        type: 'switch'
                    }
                }]
            }
        }
    ];
}

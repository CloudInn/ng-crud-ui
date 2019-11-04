import { FormView, FieldConfig } from 'crud';

export class CountrySearchForm extends FormView {
    layout = 'horizontal';
    controls: FieldConfig[] = [
        {
            name: 'code',
            label: 'Code'
        },
        {
            name: 'description',
            label: 'Desc'
        }
    ];
}

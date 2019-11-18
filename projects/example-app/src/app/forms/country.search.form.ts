import { FormView, FieldConfig } from 'crud';

export class CountrySearchForm extends FormView {
    layout = 'horizontal';
    controls: FieldConfig[] = [
        {
            name: 'id',
            label: 'ID'
        },
        {
            name: 'name',
            label: 'Name'
        }
    ];
}

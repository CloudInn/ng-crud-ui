
import { Metadata, FieldConfig } from 'crud';
import { Country } from '../models/country.model';

export class CountryMetadata implements Metadata {
    name = 'store';
    label = 'Store';
    api = '/autocomplete/search_j/?search_fields=printable_name&app_label=countries&model_name=country&limit=10';
    model = Country;
    listingFields = ['id', 'name', 'description'];
    externalNameField = 'q';
    optionName='name';
    externalValueField = 'id';
    formsets = [];
    fields: FieldConfig[] = [
        {
            name: 'id',
            label: 'ID',
            type: 'number',
            isEditable: false,
        },
        {
            name: 'name',
            label: 'Code',
            type: 'number',
            isEditable: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        }
    ];
    formActions = {};
}

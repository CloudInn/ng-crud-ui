
import { Metadata, FieldConfig } from 'crud';
import { Country } from '../models/country.model';
import { Subject } from 'rxjs';

export class CountryMetadata implements Metadata {
    name = 'country';
    label = 'Country';
    api = '/autocomplete/search_j/?search_fields=printable_name&app_label=countries&model_name=country&limit=10';
    model = Country;
    listingFields = ['id', 'name'];
    externalNameField = 'q';
    optionName = 'name';
    externalValueField = 'id';
    rows = new Subject();
    formsets = [];
    fields: FieldConfig[] = [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            isEditable: false,
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            isEditable: true,
        }
    ];
    formActions = {};
}

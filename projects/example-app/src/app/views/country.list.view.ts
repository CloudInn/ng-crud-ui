import { ListingComponent } from 'crud';
import { ListViewer } from 'crud';
import { CountryMetadata } from '../metadata/country.metadata';
import { CountrySearchForm } from '../forms/country.search.form';

export class CountryListView implements ListViewer {
    title = 'Stores';
    breadcrumbs = [{label: 'Home', path: '/'}];
    component = ListingComponent;
    metadata = new CountryMetadata();
    pagination = {
        enabled: false
    };
    search = {
        enabled: true,
        view: new CountrySearchForm(this.metadata)
    };
}

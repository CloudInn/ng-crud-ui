import { ListingComponent } from 'projects/crud/src/lib/components/listing/listing.component';
import { ListViewer } from 'projects/crud/src/lib/models/views';
import { StoreMetadata } from '../metadata/store.metadata';
import { StoreSearchForm } from '../forms/store.search.form';

export class StoreListView implements ListViewer {
    title = 'Stores';
    breadcrumbs = [{label: 'Home', path: '/'}];
    component = ListingComponent;
    metadata = new StoreMetadata();
    pagination = {
        enabled: false
    };
    search = {
        enabled: true,
        view: new StoreSearchForm(this.metadata)
    };
}

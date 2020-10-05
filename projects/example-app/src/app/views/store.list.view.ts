import { ListingComponent, ListingView, FormView } from 'crud';
import { ListViewer } from 'crud';
import { StoreMetadata } from '../metadata/store.metadata';
import { StoreSearchForm } from '../forms/store.search.form';

export class StoreListView extends ListingView {
    title = 'stores';
    breadcrumbs = [{ label: 'Home', path: '/' }];
    component = ListingComponent;
    metadata = this.metadata;
    dialog_mode = this.viewSettings.isDialog;
    pagination = {
        enabled: true,
        pageSize: 20
    };
    search = {
        enabled: true,
        view: new FormView(this.metadata),
        search_key: this.viewSettings.search_settings.search_key,
        mode: this.viewSettings.search_settings.mode
    };
}

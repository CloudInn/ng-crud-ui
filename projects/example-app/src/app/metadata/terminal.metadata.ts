import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Metadata, FieldConfig } from 'crud';
import { Terminal } from '../models/terminal.model';
import { StoreMetadata } from '../metadata/store.metadata';
import { StoreListView } from '../views/store.list.view';

export class TerminalMetadata implements Metadata {
    name = 'terminal';
    label = 'Terminal';
    api = '/api/terminals/';
    model = Terminal;
    listingFields = ['id', 'number', 'description', 'rcrs_number', 'last_invoice_id', 'is_locked', 'store'];
    queryParams = ['id', 'number', 'description', 'rcrs_number', 'last_invoice_id', 'is_locked', 'store'];
    includeParams = false;
    filter = false;
    formsets = [];
    applyFunctions = false;
    bulkActions = [{
        name: 'Merge Profiles',
        type: 'dialog',
        api: '/api/core/individualprofile/v3/merge/',
        api_type: 'post',
        body: { main_profile: '', id: [] },
        content: 'Please choose a primary profile',
        minLength: 2
    }];
    fields: FieldConfig[] = [
        {
            name: 'id',
            label: 'ID',
            type: 'number',
            isEditable: false,
            isClickable: true
        },
        {
            name: 'number',
            label: 'Number',
            type: 'number',
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'rcrs_number',
            label: 'RCRS',
            type: 'text',
            validators: [
            ],
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'last_invoice_id',
            label: 'Last Invoice',
            type: 'boolean',
            isEditable: true
        },
        {
            name: 'is_locked',
            label: 'Locked',
            type: 'boolean',
            isEditable: true,
        },
        {
            name: 'store_id',
            label: 'Outlet ID',
            type: 'date',
            isHidden: false,
            isEditable: true,
        },
        {
            name: 'store',
            label: 'Outlet',
            type: 'foreignKey_multiple',
            control: {
                metadata: new StoreMetadata(),
                viewConfig: new StoreListView(),
            },
            isEditable: true,
            isSearchable: true,
        }
    ];
    formActions = [{
        unlock: (http: HttpClient, id: number) => {
            return http.get(`/api/pos/terminal/${id}/unlock/`).subscribe(res => {
                return res;
            });
        }
    }];
}

import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Metadata } from 'projects/crud/src/lib/models/metadata';
import { Terminal } from 'src/app/models/terminal.model';
import { StoreMetadata } from 'src/app/metadata/store.metadata';
import { StoreListView } from 'src/app/views/store.list.view';

export class TerminalMetadata implements Metadata {
    name = 'terminal';
    label = 'Terminal';
    api = '/api/pos/terminal/';
    model = Terminal;
    listingFields = ['id', 'number', 'description', 'rcrs_number', 'last_invoice_id', 'is_locked'];
    externalNameField = 'description';
    externalValueField = 'id';
    formsets = [];
    fields = [
        {
            name: 'id',
            label: 'ID',
            type: 'number',
            isSearchable: true,
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
            type: 'string',
            validators: [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(11),
            ],
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'last_invoice_id',
            label: 'Last Invoice',
            type: 'text',
        },
        {
            name: 'is_locked',
            label: 'Locked',
            type: 'boolean',
        },
        {
            name: 'store',
            label: 'Outlet',
            control: {
                type: 'foreignKey',
                metadata: new StoreMetadata(),
                viewConfig: new StoreListView(),
            },
            isEditable: true,
            isSearchable: true,
        }
    ];
    formActions = {
        unlock: (http: HttpClient, id: number) => {
            return http.get(`/api/pos/terminal/${id}/unlock/`).subscribe(res => {
                return res;
            });
        }
    };
}

import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Metadata } from 'projects/crud/src/lib/models/metadata';
import { Room } from 'src/app/models/room.model';
import { StoreMetadata } from 'src/app/metadata/store.metadata';
import { StoreListView } from 'src/app/views/store.list.view';

export class RoomMetadata implements Metadata {
    name = 'room';
    label = 'Room';
    api = '/reservation/api/room/';
    model = Room;
    listingFields = ['id', 'number', 'type'];
    externalNameField = 'type';
    externalValueField = 'id';
    fields = [
        {
            name: 'id',
            label: 'ID',
            type: 'id',
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
            name: 'type',
            label: 'Type',
            isEditable: true,
            isSearchable: true,
        }
    ];
    formsets = [];
    formActions = {};
}

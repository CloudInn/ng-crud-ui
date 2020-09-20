import { Metadata, FieldConfig } from 'crud';
import { Room } from '../models/room.model';

export class RoomMetadata implements Metadata {
    name = 'room';
    label = 'Room';
    api = '/api/rooms';
    model = Room;
    listingFields = ['id', 'number', 'type', 'description'];
    searchParam = 'type';
    fields: FieldConfig[] = [
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
            name: 'type',
            label: 'Type',
            type: 'text',
            isEditable: true,
            isSearchable: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textArea',
        }
    ];
    formsets = [];
    formActions = [];
}

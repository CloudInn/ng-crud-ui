export class Occupancy {
    number_of_adults: number;
    number_of_children: number;
}


export class Room {
    id: number;
    number: number;
    type: string;
    occupancy: Occupancy[];
}

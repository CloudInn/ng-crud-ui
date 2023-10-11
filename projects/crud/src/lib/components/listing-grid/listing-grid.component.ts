import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ViewConfig } from '../../models/views';


const ELEMENT_DATA: any[] = [
  { night: 1, fourbedroom: 0, sixbedroom: 1, double: 0 },
  { night: 2, fourbedroom: 1, sixbedroom: 4, double: 0 },
  { night: 3, fourbedroom: 3, sixbedroom: 6, double: 1 },
  { night: 4, fourbedroom: 0, sixbedroom: 9, double: 1 },
  { night: 5, fourbedroom: 0, sixbedroom: 0, double: 0 },
  { night: 6, fourbedroom: 7, sixbedroom: 1, double: 1 },
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'ng-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.css'],
})
export class ListingGridComponent implements OnInit {
  @Output() selectElementFromGrid: EventEmitter<any> = new EventEmitter();
  @Input() gridData: ViewConfig;

  displayedColumns: string[] = ['night', 'fourbedroom', 'sixbedroom', 'double'];
  dataSource = ELEMENT_DATA;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.api.fetch(this.gridData.metadata.api).subscribe(res => {
      console.log("response from api", res);

    });
  }

  clickRow(row) {
    this.selectElementFromGrid.emit(row);
  }
}

import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() listData: any;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log(this.listData);
  }
}

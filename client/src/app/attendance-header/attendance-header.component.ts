import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendance-header',
  templateUrl: './attendance-header.component.html',
  styleUrls: ['./attendance-header.component.scss']
})
export class AttendanceHeaderComponent implements OnInit {
  @Input() date!: Date;
  @Output() onDate = new EventEmitter<number>();
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct; @Input() summary: any;

  constructor() {
    if (!this.date) this.date = new Date();

    this.minDate = {
      day: 1,
      month: this.date.getMonth() + 1,
      year:this.date.getFullYear()
    };

    this.maxDate = {
      day: this.date.getDate(),
      month: this.date.getMonth() + 1,
      year:this.date.getFullYear()
    };
  }

  ngOnInit(): void {
  }

}

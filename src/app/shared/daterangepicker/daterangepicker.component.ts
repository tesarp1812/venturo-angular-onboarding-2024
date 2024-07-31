import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent implements OnInit {
  @Input() start;
  @Input() end;
  @Input() today;
  @Output() periode = new EventEmitter<any>();
  @Input() allPeriode = false;

  dateRangePicker: any;
  daterange: any = {};
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: true,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [ moment().subtract(1, 'days'), moment().subtract(1, 'days'),],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [ moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month'),],
    },
  };

  constructor() {}

  getStartDate(today?:boolean) {
    const date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    if (today == true) {
      firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const ddf = String(firstDay.getDate()).padStart(2, '0');
    const mmf = String(firstDay.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyyf = firstDay.getFullYear();

    const dayfirst = yyyyf + '-' + mmf + '-' + ddf;

    return {
        label : dayfirst,
        value : moment(firstDay).format('YYYY-MM-DD'),
    };
  }

  getLastDate(today?:boolean) {
    const date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (today == true) {
        lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const ddl = String(lastDay.getDate()).padStart(2, '0');
    const mml = String(lastDay.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyyl = lastDay.getFullYear();

    const daylast = yyyyl + '-' + mml + '-' + ddl;

    return {
      label : daylast,
      value : moment(lastDay).format('YYYY-MM-DD'),
    };
  }

  ngOnInit(): void {
    const start = this.getStartDate(this.today);
    const end = this.getLastDate(this.today);

    const dayfirst = start.label;
    const daylast = end.label;

    const data = {
      start: this.allPeriode ? '' : start.value,
      end: this.allPeriode ? '' : end.value,
    };

    this.dateRangePicker = dayfirst + ' - ' + daylast;

    this.options.startDate = data.start;
    this.options.endDate = data.end;

    this.periode.emit(data);
  }

  clickAll() {
    this.allPeriode = !this.allPeriode;
    if (this.allPeriode === true) {
      const data = {
        start: '',
        end: '',
      };
      this.periode.emit(data);
    } else {
      const start = this.getStartDate(this.today);
      const end = this.getLastDate(this.today);

      const dayfirst = start.label;
      const daylast = end.label;

      const data = {
        start: this.allPeriode ? '' : start.value,
        end: this.allPeriode ? '' : end.value,
      };

      this.dateRangePicker = dayfirst + ' - ' + daylast;
      this.options.startDate = data.start;
      this.options.endDate = data.end;

      this.periode.emit(data);
    }
  }

  selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    const start = moment(value.start).format('YYYY-MM-DD');
    const end = moment(value.end).format('YYYY-MM-DD');
    const data = {
        start: start,
        end: end,
    };
    this.periode.emit(data);
  }
}

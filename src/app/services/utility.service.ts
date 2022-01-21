import { Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { DailyTimeLine, MonthlyTime } from "../model/time-line.model";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor() {}
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  weekShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  getAllDays(startDate: Date, endDate: Date): DailyTimeLine[] {
    if (startDate > endDate) return [];
    else {
      let totalDays = this.totalDays(startDate, endDate);
      let days: DailyTimeLine[] = [];
      let element = new Date(startDate);
      for (let index = 0; index < totalDays; index++) {
        element = this.addDays(element, 1);
        days.push({
          year: element.getFullYear().toString(),
          month: this.monthShortNames[element.getMonth()],
          weekDay: this.weekShortDays[element.getDay()],
          isWeekend: element.getDay() === 0 || element.getDay() === 6,
          day: ("0" + element.getDate()).slice(-2),
        });
      }
      return days;
    }
  }
  getAllmonth(startDate: Date, endDate: Date): MonthlyTime[] {
    if (startDate > endDate) return [];
    else {
      let totalDays = this.totalDays(startDate, endDate);
      let element = new Date(startDate);
      let months: MonthlyTime[] = [];
      let currMonth = -1;
      let leng = 0;
      for (let index = 0; index < totalDays; index++) {
        this.addDays(element, 1);
        if (currMonth !== element.getMonth()) {
          leng = 0;
          months.push({
            days: index,
            year: element.getFullYear().toString(),
            month: this.monthNames[element.getMonth()],
            length:
              element.getDate() === 1
                ? new Date(
                    element.getFullYear(),
                    element.getMonth() + 1,
                    0
                  ).getDate()
                : 31 - element.getDate(),
          });
          currMonth = element.getMonth();
        }
        leng = leng + 1;
        months[months.length - 1].length = leng;
      }
      return months;
    }
  }
  addDays(date: Date, days: number): Date {
    if (date !== undefined) date.setDate(date.getDate() + days);
    return date;
  }
  public sortByDueDate(dateArray: Data[]): void {
    dateArray.sort((val1, val2) => {
      return val1.getTime() - val2.getTime();
    });
  }
  //
  isDateWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }
  //
  totalDays(start: Date, end: Date): number {
    return Math.round((+end - +start) / (1000 * 60 * 60 * 24));
  }
  //For Safari DATA CHALLANGE :((((
  dataFormatConvertor(dateString?: string) {
    var [day, month, year] = dateString.split("/");
    return new Date(+("20" + year), this.monthShortNames.indexOf(month), +day);
  }
}

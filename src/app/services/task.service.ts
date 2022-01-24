import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";
import { Issue } from "../model/temp-data.model";
import { BehaviorSubject, interval, Observable, of } from "rxjs";
import { flatten } from "@angular/compiler";
import { UtilityService } from "./utility.service";
import { DailyTimeLine, MonthlyTime } from "../model/time-line.model";
@Injectable({
  providedIn: "root",
})
export class TaskService {
  daysBeforeStart: number = -51;
  allDays: DailyTimeLine[] = [];
  allMonth: MonthlyTime[] = [];

  tempDate$: BehaviorSubject<Issue[]> = new BehaviorSubject([]);
  //
  constructor(private http: HttpClient, private utility: UtilityService) {
    this.updateData();
  }
  updateData() {
    this.getStaticData().subscribe((x) => {
      this.tempDate$.next(x);
      this.timeLineGenerator();
    });
  }
  //
  private getStaticData(): Observable<Issue[]> {
    return this.http.get("assets/static/temp-data.json").pipe(
      map((x) => {
        return x["issues"];
      })
    );
  }
  //
  public get uniqNames$() {
    return this.tempDate$.pipe(
      map((c) => {
        let set = new Set(flatten(c.map((f) => f.fields?.labels)));
        return [...set];
      })
    );
  }
  //
  getTasksOfLabel$(label: string) {
    return this.tempDate$.pipe(
      map((x) =>
        x.filter((v) => v.fields.labels.findIndex((f) => f === label) > -1)
      )
    );
  }
  //
  getTaskByID(id: string) {
    return this.tempDate$.pipe(
      map((x) => x.filter((v) => v.id === id.toString()), take(1))
    );
  }
  //
  public get taskDate$() {
    return this.tempDate$.pipe(
      map((x) => x.map((c) => c.renderedFields.duedate?.replace("ä", "a"))),
      map((b) => b.filter((x) => x !== undefined)),
      map((dt) => dt.map((i) => this.utility.dataFormatConvertor(i))),
      map((s) =>
        s.sort((a, b) => {
          return a.getTime() - b.getTime();
        })
      )
    );
  } // Generate time-line
  timeLineGenerator() {
    let getTimeLine$ = this.taskDate$.subscribe((x) => {
      let start = this.utility.addDays(x[0], this.daysBeforeStart);
      let end = this.utility.addDays(x[x.length - 1], 2);
      let days = this.utility.getAllDays(start, end);
      let months = this.utility.getAllmonth(start, end);
      this.allMonth = months;
      this.allDays = days;
    });
    // unsubscribe timeline update (issue on drag and drop)
    interval(2000)
      .pipe(take(1))
      .subscribe((x) => {
        getTimeLine$.unsubscribe();
      });
  }
}

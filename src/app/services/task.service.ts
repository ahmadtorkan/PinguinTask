import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { distinct, filter, map, take, tap } from "rxjs/operators";
import { Issue } from "../model/temp-data.model";
import { BehaviorSubject, Observable, of } from "rxjs";
import { flatten } from "@angular/compiler";
import { UtilityService } from "./utility.service";
@Injectable({
  providedIn: "root",
})
export class TaskService {
  daysBeforeStart: number = -51;
  tempDate$: BehaviorSubject<Issue[]> = new BehaviorSubject([]);
  //
  constructor(private http: HttpClient, private utility: UtilityService) {
    this.updateData();
  }
  updateData() {
    this.getStaticData().subscribe((x) => {
      this.tempDate$.next(x);
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
      map((x) => x.filter((v) => v.id === id.toString()), take(1)),
      tap((x) => console.log(x))
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
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { DailyTimeLine, MonthlyTime } from "./model/time-line.model";
import { SharedService } from "./services/shared.service";
import { TaskService } from "./services/task.service";
import { UtilityService } from "./services/utility.service";
import { concatAll, take, tap } from "rxjs/operators";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  allLabels: string[] = [];
  labels: string[] = [];
  allDays: DailyTimeLine[] = [];
  allMonth: MonthlyTime[] = [];
  dayLength: number = 1000;
  zoomSubsc$: Subscription;
  labelSubsc$: Subscription;
  //
  constructor(private dataEngine: TaskService, private sharedService: SharedService, private utility: UtilityService) {}
  //
  ngOnInit(): void {
    //
    this.zoomListener();
    //
    this.timeLineGenerator();
    //
    this.loadLabels();
  }
  //
  zoomListener() {
    this.zoomSubsc$ = this.sharedService.zoomLevel$.subscribe((res) => {
      this.dayLength = res + this.sharedService.dayBasis;
    });
  }
  // Generate time-line
  timeLineGenerator() {
    let getTimeLine$ = this.dataEngine.taskDate$.subscribe((x) => {
      let start = this.utility.addDays(x[0], this.dataEngine.daysBeforeStart);
      let end = this.utility.addDays(x[x.length - 1], 2);
      let days = this.utility.getAllDays(start, end);
      let months = this.utility.getAllmonth(start, end);
      this.allMonth = months;
      this.allDays = days;
    });
    // unsubscribe timeline update (issue on drag and drop)
    interval(1000)
      .pipe(take(1))
      .subscribe((x) => {
        getTimeLine$.unsubscribe();
      });
  }
  //Get first label for initial page (in this case 'EVA')
  loadLabels() {
    this.labelSubsc$ = this.dataEngine.uniqNames$
      .pipe(
        tap((x) => (this.allLabels = x)),
        concatAll(),
        take(1)
      )
      .subscribe((x) => this.labels.push(x));
  }
  // add person (label) to page by filtering
  labelAdd(event: any, name: string) {
    if (event.currentTarget.checked) {
      if (this.labels.indexOf(name) === -1) this.labels.push(name);
    } else {
      if (this.labels.indexOf(name) > -1) this.labels.splice(this.labels.indexOf(name), 1);
    }
  }
  //
  ngOnDestroy(): void {
    this.zoomSubsc$.unsubscribe();
    this.labelSubsc$.unsubscribe();
  }
}

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { DailyTimeLine, MonthlyTime } from "src/app/model/time-line.model";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-time-line",
  templateUrl: "./time-line.component.html",
  styleUrls: ["./time-line.component.scss"],
})
export class TimeLineComponent implements OnInit, OnDestroy {
  //
  @Input("days") allDays: DailyTimeLine[] = [];
  @Input("months") allMonth: MonthlyTime[] = [];
  //
  dayLength: number;
  //
  isSticky: boolean = false;
  dailyTime: boolean = true;
  weeklyTime: boolean = false;
  monthlyTime: boolean = false;
  //
  zoomSubsc$: Subscription;
  scrollSubsc$: Subscription;
  //
  constructor(private sharedService: SharedService) {}
  //
  ngOnInit(): void {
    this.zoominit();
    //
    this.scrollPage();
  }
  //
  //zoom subscribtion
  zoominit() {
    this.zoomSubsc$ = this.sharedService.zoomLevel$.subscribe((res) => {
      this.dayLength = res + this.sharedService.dayBasis;
      if (res < -20) {
        this.monthlyTime = true;
        this.weeklyTime = false;
        this.dailyTime = false;
      } else if (res < 0) {
        this.weeklyTime = true;
        this.monthlyTime = false;
        this.dailyTime = false;
      } else {
        this.dailyTime = true;
        this.monthlyTime = false;
        this.weeklyTime = false;
      }
    });
  }
  //Scroll Event Handeling
  scrollPage() {
    this.scrollSubsc$ = fromEvent(document, "scroll")
      .pipe(map((x: any) => x.target.documentElement.scrollTop))
      .subscribe((x) => {
        if (x > 40) this.isSticky = true;
        else this.isSticky = false;
      });
  }
  // zoom Event +/-
  zoomTask(number) {
    if (number === 1) this.sharedService.incrZoomLevel();
    if (number === 0) this.sharedService.decrZoomLevel();
  }
  //
  ngOnDestroy(): void {
    this.zoomSubsc$.unsubscribe();
    this.scrollSubsc$.unsubscribe();
  }
}

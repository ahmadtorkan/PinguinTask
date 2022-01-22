import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { concatAll, first } from "rxjs/operators";
import { Issue } from "src/app/model/temp-data.model";
import { TaskService } from "src/app/services/task.service";
import { UtilityService } from "src/app/services/utility.service";
@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit, OnDestroy {
  //
  taskItems: Issue[] = [];
  //
  startTimeLine: Date;
  @Input("label-name") label: string;
  //
  labelDataSubsc$: Subscription;
  dayCalcSubsc$: Subscription;
  //
  constructor(private taskService: TaskService, private utility: UtilityService) {}
  //
  ngOnInit(): void {
    this.dayCalcSubsc$ = this.taskService.taskDate$
      .pipe(concatAll(), first())
      .subscribe((c) => (this.startTimeLine = this.utility.addDays(new Date(c), this.taskService.daysBeforeStart)));
    this.labelDataSubsc$ = this.taskService.getTasksOfLabel$(this.label).subscribe((result) => (this.taskItems = result));
  }
  //*
  //Calculate Task start date (form Start) AND duration Days
  taskDurCalc(estDate: string, estSecs: number): { startDay: number; days: number } {
    let latinDate: string = estDate.replace("ä", "a");
    let estDays = estSecs / 28800;
    for (let index = 0; index < estDays; index++) {
      if (this.utility.isDateWeekend(this.utility.addDays(this.utility.dataFormatConvertor(latinDate), -index))) estDays = estDays + 1;
    }
    let days = this.utility.totalDays(
      this.utility.addDays(this.utility.dataFormatConvertor(latinDate), -estDays),
      this.utility.dataFormatConvertor(latinDate)
    );
    let spc = this.utility.totalDays(this.startTimeLine, this.utility.addDays(this.utility.dataFormatConvertor(latinDate), -estDays));
    return { startDay: spc, days: days };
  }
  //
  ngOnDestroy(): void {
    this.labelDataSubsc$.unsubscribe();
    this.dayCalcSubsc$.unsubscribe();
  }
}

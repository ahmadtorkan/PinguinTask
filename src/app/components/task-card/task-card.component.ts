import { Component, Input, OnInit } from "@angular/core";
import { concatAll, first, map, tap } from "rxjs/operators";
import { Issue } from "src/app/model/temp-data.model";
import { TaskService } from "src/app/services/task.service";
import { UtilityService } from "src/app/services/utility.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TaskDetailComponent } from "../task-detail/task-detail.component";
@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  startTimeLine: Date;
  @Input("label-name") label: string;
  //
  taskItems: Issue[] = [];
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.taskService.taskDate$
      .pipe(concatAll(), first())
      .subscribe(
        (c) =>
          (this.startTimeLine = this.utility.addDays(
            new Date(c),
            this.taskService.daysBeforeStart
          ))
      );
    this.taskService
      .getTasksOfLabel$(this.label)
      .subscribe((result) => (this.taskItems = result));
  }
  //*
  //Calculate Task start date (form Start) AND duration Days
  taskDurCalc(
    estDate: string,
    estSecs: number
  ): { startDay: number; days: number } {
    let latinDate: string = estDate.replace("ä", "a");
    let estDays = estSecs / 28800;
    for (let index = 0; index < estDays; index++) {
      if (
        this.utility.isDateWeekend(
          this.utility.addDays(
            this.utility.dataFormatConvertor(latinDate),
            -index
          )
        )
      )
        estDays = estDays + 1;
    }
    let days = this.utility.totalDays(
      this.utility.addDays(
        this.utility.dataFormatConvertor(latinDate),
        -estDays
      ),
      this.utility.dataFormatConvertor(latinDate)
    );
    let spc = this.utility.totalDays(
      this.startTimeLine,
      this.utility.addDays(
        this.utility.dataFormatConvertor(latinDate),
        -estDays
      )
    );
    return { startDay: spc, days: days };
  }
  //
  taskInfo(key: string) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: "450px",
      height: "370px",
      data: { key },
    });
  }
}

import { CdkDragStart } from "@angular/cdk/drag-drop";
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { SharedService } from "src/app/services/shared.service";
import { TaskService } from "src/app/services/task.service";
import { UtilityService } from "src/app/services/utility.service";
import { TaskDetailComponent } from "../task-detail/task-detail.component";

@Component({
  selector: "app-person-card",
  templateUrl: "./person-card.component.html",
  styleUrls: ["./person-card.component.scss"],
})
export class PersonCardComponent implements OnInit, OnDestroy {
  //find card size for small card detection
  @ViewChild("cardBox", { read: ElementRef, static: true }) cardBox: ElementRef;
  //
  @Input("taskDur") taskDur: string;
  @Input("label") label: string;
  @Input("taskKey") taskKey: string = "";
  @Input("summary") summary: string = "";
  @Input("owner") owner?: string = "";
  @Input("id") id: number = 0;
  //event ON *SET for change task time and week-end calculate
  private _taskTime;
  @Input("taskTime") public set taskTime(value: {
    startDay: number;
    days: number;
  }) {
    this.startPos =
      value.startDay * (this.sharedService.dayBasis + this.zoomLevel);
    this.duration = value.days * (this.sharedService.dayBasis + this.zoomLevel);

    this._taskTime = value;
  }
  public get taskTime() {
    return this._taskTime;
  }
  // drag and click diff
  dragging: boolean;
  zoomLevel: number;
  top: number = 0;
  startPos: number = 0;
  duration: number = 0;
  smallCard: boolean;
  verySmallCard: boolean = false;
  //
  zoomSubj$ = new Subscription();
  constructor(
    public dialog: MatDialog,
    private sharedService: SharedService,
    private taskService: TaskService,
    private utility: UtilityService
  ) {}
  //
  ngOnInit(): void {
    this.zoomListener();
  }
  zoomListener() {
    this.zoomSubj$ = this.sharedService.zoomLevel$.subscribe((res) => {
      this.zoomLevel = res;
      this.startPos =
        this.taskTime.startDay * (this.sharedService.dayBasis + res);
      this.duration = this.taskTime.days * (this.sharedService.dayBasis + res);
      this.smallCard = this.cardBox.nativeElement.clientWidth < 100;
      this.verySmallCard = res < 30 && this.taskTime.days <= 6;
    });
    this.smallCard = this.taskTime.days < 7;
  }
  // For ignore click event in drag and drop
  public handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }
  //Drag and drop Event
  dropped(event: any) {
    let xchanged = event.source.getFreeDragPosition().x;
    //Hand shake ignored
    if (xchanged > 20 || xchanged < -20) {
      let x = Math.floor(
        event.source.getFreeDragPosition().x /
          (this.sharedService.dayBasis + this.zoomLevel)
      );
      if (x >= 0) ++x;
      const lastPoint = this.taskService.tempDate$.value;
      let itemindex = lastPoint.findIndex((x) => +x.id === this.id);
      let dueDate = lastPoint[itemindex].renderedFields.duedate;
      let lastDate = this.utility.dataFormatConvertor(dueDate);
      this.utility.addDays(lastDate, x);
      let newDay = ("0" + lastDate.getDate()).slice(-2);
      let newYear = ("0" + lastDate.getFullYear()).slice(-2);
      let newMonth = this.utility.monthShortNames[lastDate.getMonth()];
      lastPoint[itemindex].renderedFields.duedate =
        newDay + "/" + newMonth + "/" + newYear;
      this.taskService.tempDate$.next(lastPoint);
    }
    event.source._dragRef.reset();
  }
  //task Info Dialog OPEN
  taskInfo() {
    if (this.dragging) {
      this.dragging = false;
      return;
    }
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: "450px",
      height: "280px",
      data: { id: this.id },
    });
  }
  ngOnDestroy(): void {
    //destroy Observable!!!
    this.zoomSubj$.unsubscribe();
  }
}

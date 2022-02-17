import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Issue } from "src/app/model/temp-data.model";
import { TaskService } from "src/app/services/task.service";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  taskInfo: Issue;
  clearDate: string;
  //
  constructor(
    private utility: UtilityService,
    private dataService: TaskService,
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  //Find task information by ID
  ngOnInit(): void {
    this.dataService.getTaskByID(this.data.id).subscribe((x) => {
      this.taskInfo = x[0];
      this.clearDate = this.utility
        .dataFormatConvertor(x[0].renderedFields.duedate)
        .toISOString();
    });
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { SharedService } from "./services/shared.service";
import { TaskService } from "./services/task.service";
import { UtilityService } from "./services/utility.service";
import { concatAll, delay, filter, take, tap } from "rxjs/operators";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  allLabels: string[] = [];
  activeLabels: string[] = ["EVA", "Roadmap", "revenue"];
  labels: string[] = [];
  dayLength: number = 1000;
  zoomSubsc$: Subscription;
  labelSubsc$: Subscription;
  //
  constructor(
    public dataEngine: TaskService,
    private sharedService: SharedService
  ) {}
  //
  ngOnInit(): void {
    //
    this.zoomListener();
    //
    this.loadLabels();
  }
  // Listen To zoom in OR out click to adject time card size and informations
  zoomListener() {
    this.zoomSubsc$ = this.sharedService.zoomLevel$.subscribe((res) => {
      this.dayLength = res + this.sharedService.dayBasis;
    });
  }

  //Get first label for initial page (in this case 'EVA')
  loadLabels() {
    this.labelSubsc$ = this.dataEngine.uniqNames$
      .pipe(
        tap((x) => (this.allLabels = x)),
        concatAll(),
        filter((x) => this.activeLabels.findIndex((l) => l === x) > -1)
      )
      .subscribe((x) => this.labels.push(x));
    // Unsubscribe because After Drag and Drop JSON date change and emit new
    // data and all filters remove
    interval(1500)
      .pipe(take(1))
      .subscribe((x) => {
        this.labelSubsc$.unsubscribe();
      });
  }
  // Upper Filter
  // Add person (label) to page by filtering
  labelAdd(event: any, name: string) {
    if (event.currentTarget.checked)
      if (this.activeLabels.findIndex((x) => x === name) > -1) return;
      else this.activeLabels.push(name);
    else {
      if (this.activeLabels.findIndex((x) => x === name) > -1) {
        this.activeLabels.splice(this.labels.indexOf(name), 1);
      }
    }
    this.labels = this.activeLabels;
  }
  isActiveLabel(label: string): boolean {
    return this.activeLabels.findIndex((x) => x === label) > -1;
  }
  //
  ngOnDestroy(): void {
    this.zoomSubsc$.unsubscribe();
    this.labelSubsc$.unsubscribe();
  }
}

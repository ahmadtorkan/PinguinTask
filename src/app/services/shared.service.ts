import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  dayBasis: number = 70;
  zoomStep: number = -50;
  zoomLevel$: BehaviorSubject<number>;
  //
  constructor() {
    this.zoomLevel$ = new BehaviorSubject(this.zoomStep);
  }
  //
  incrZoomLevel() {
    this.zoomStep = this.zoomStep + 5;
    this.zoomLevel$.next(this.zoomStep);
  }
  decrZoomLevel() {
    if (this.zoomStep >= -45) {
      this.zoomStep = this.zoomStep - 5;
    }
    this.zoomLevel$.next(this.zoomStep);
  }
}

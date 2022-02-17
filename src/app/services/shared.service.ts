import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  // Basic lenght of day in PX
  dayBasis: number = 70;
  // Current Zoom LEVEL!
  zoomStep: number = -50;
  // Zoom Subject
  private _zoomLevel$: BehaviorSubject<number>;
  public get zoomLevel$(): Observable<number> {
    return this._zoomLevel$.asObservable();
  }

  // Initial zoom step for starting application
  constructor() {
    this._zoomLevel$ = new BehaviorSubject(this.zoomStep);
  }
  // Zoom in with 5PX
  incrZoomLevel() {
    this.zoomStep = this.zoomStep + 5;
    this._zoomLevel$.next(this.zoomStep);
  }
  // Zoom Out with -5PX
  decrZoomLevel() {
    // MIN ZOOM NUMBER IS -45
    if (this.zoomStep >= -45) {
      this.zoomStep = this.zoomStep - 5;
    }
    this._zoomLevel$.next(this.zoomStep);
  }
}

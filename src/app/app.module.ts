import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { PersonCardComponent } from "./components/person-card/person-card.component";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { TaskDetailComponent } from "./components/task-detail/task-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TimeLineComponent } from "./components/time-line/time-line.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [
    AppComponent,
    PersonCardComponent,
    TaskCardComponent,
    TaskDetailComponent,
    TimeLineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

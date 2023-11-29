import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CsesGanttViewComponent} from "../cses-gantt-view/cses-gantt-view.component";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        CsesGanttViewComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

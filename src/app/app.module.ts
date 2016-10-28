import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { MdlModule } from 'angular2-mdl';

import { AppComponent } from './app.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryService } from "./story.service";

import { InMemoryWebApiModule } from "angular-in-memory-web-api/in-memory-web-api.module";
import { WithInMemoryDataService }  from './with-in-memory-data.service';
import "./rxjs-ext";

import { StoryDetailResolver } from "./story-detail/story-detail.resolver.service";

import { AppProgressService } from "./app.progress.service";


@NgModule({
  declarations: [
    AppComponent,
    ContentMainComponent,
    StoryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WithInMemoryDataService),
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: StoryDetailComponent,
        resolve: {
          story: StoryDetailResolver
        }
      },
      { path: '', component: ContentMainComponent },
      { path: '**', redirectTo: "/", pathMatch: "full" }
    ]),

    MdlModule
  ],
  providers: [
    StoryService, AppProgressService,
    StoryDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

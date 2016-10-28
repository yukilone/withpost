import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable }  from "rxjs/Observable";

import { Story } from "./story";
import { STORIES } from "./story.mock";

@Injectable()
export class StoryService {
  private storiesUrl = "app/stories";

  constructor(private http: Http) { }



  getStories(): Observable<Story[]> {
    return this.http.get(this.storiesUrl)
      .map(this.getData)
      .catch(this.handleErr);
  }
  getStory(id: number): Observable<Story> {
    return this.http.get(`${this.storiesUrl}/${id}`)
      .map(this.getData)
      .catch(this.handleErr);
  }

  private getData(res: Response) {
    let body = res.json();
    return body.data || {};
  }



  private handleErr(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `error.statues: ${error.status} - error.statusText: ${error.statusText || ''} err: ${err}`;
    } else {
      errMsg = error.message ?
        "error.message : " + error.message : "error.toString() : " + error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}

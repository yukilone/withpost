import { Injectable }             from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable }  from "rxjs/Observable";

import { Story } from '../story';
import { StoryService } from '../story.service';


@Injectable()
export class StoryDetailResolver implements Resolve<Story> {

  constructor(private storyService: StoryService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Story> {
    let id = +route.params['id'];
    return this.storyService.getStory(id);
  }

  /*
  setToBack() {
    this.router.navigate(['/'], { fragment: "top" });
  }
  */
}

import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';


import { StoryService } from "../story.service"
import { Story } from "../story";


import { AppProgressService } from "../app.progress.service";



@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit, AfterContentInit {

  @Input() storyId: number;
  story: Story;
  safeHtml: SafeHtml;



  constructor(
    private progressService: AppProgressService,
    private sanitizer: DomSanitizer,
    private storyService: StoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.route.data.forEach((data: { story: Story }) => {
      this.story = data.story;
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(data.story.content)
    });
    const element = document.querySelector("#top");
    if (element) {
      element.scrollIntoView(element);
    }



    /*
        this.route.params.forEach((params: Params) => {
          this.storyId = +params['id'];

          //console.log(this.storyId);
          // (+) operator : It convert a string value to a number
          this.storyService.getStory(this.storyId)
            .subscribe(s => {
              this.story = s;
              this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.story.content);
            }, e => alert(<any>e));

        });
        */

  }

  ngAfterContentInit() {
    this.progressService.getProgress().val = 0;
    const int = setInterval(() => {
      if (this.progressService.getProgress().val >= 100) {
        console.log(this.progressService.getProgress());
        clearInterval(int);
      }
      else this.progressService.getProgress().val += 20;
    }, 100);
  }

}

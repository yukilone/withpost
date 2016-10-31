import { Component, OnInit,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from "@angular/router";

import { MdlDefaultTableModel } from "angular2-mdl";

import { StoryService } from "../story.service";
import { Story } from "../story";




class ITableItem {
  material: string;
  /*
  quantity: number;
  unitPrice: number;
  */
  selected: boolean;
}



@Component({
  selector: 'app-content-main',
  templateUrl: './content-main.component.html',
  styleUrls: ['./content-main.component.css'],
  /*
  animations: [ // view 에 다음 코드 붙일 것 => [@showIn]="story.state" (@showIn.start)="animationStarted(story)"
    trigger('showIn', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
  */
})
export class ContentMainComponent implements OnInit {
  stories: Story[];
  errorMessage: string;
  tableData: [ITableItem] = [
    { material: 'Acrylic (Transparent)', selected: true },
    { material: 'Plywood (Birch)', selected: false },
    { material: 'Laminate (Gold on Blue)', selected: false }
    /*
    { material: 'Acrylic (Transparent)', quantity: 25, unitPrice: 2.90, selected: true },
    { material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false },
    { material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false }
    */
  ];
  selected: ITableItem[] = [];
  tableModel = new MdlDefaultTableModel([
    { key: 'material', name: 'Material', sortable: true },
    /*
    { key: 'quantity', name: 'Quantity', sortable: true, numeric: true },
    { key: 'unitPrice', name: 'Unit Price', numeric: true }
    */
  ]);




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storyService: StoryService) { }

  ngOnInit() {



    // this.getStories();
    this.route.data.forEach((data: { stories: Story[] }) => {
      this.stories = data.stories;
    });

    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter(data => data.selected);



    const element = document.querySelector("#top");
    if (element) {
      element.scrollIntoView(element);
    }

    /*
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          // you can use DomAdapter
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            element.scrollIntoView(element);
          }
        }
      }

    });
    */


  }

  selectionChanged($event) {
    this.selected = $event.value;
  }

  action() {
    alert("Hello");
  }


  getStories() {
    this.storyService.getStories()
      .subscribe(
      stories => this.stories = stories,
      error => {
        this.errorMessage = <any>error;
        alert(this.errorMessage);
      });
  }


  goDetail(story: Story) {
    let link = ['/detail', story.id];
    let navigationExtras: NavigationExtras = {
      /* queryParams: { 'session_id': sessionId }, */
      fragment: 'top'
    };

    this.router.navigate(link);
  }


  /*
  animationStarted(story) {
    let delay = Math.random();
    delay = +delay.toFixed(2) * 500;
    setTimeout(() => story.state = "active", delay);

  }
  */

}

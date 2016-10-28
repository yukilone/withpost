import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from "@angular/router";

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
  styleUrls: ['./content-main.component.css']
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
    private storyService: StoryService) { }

  ngOnInit() {



    this.getStories();
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

}

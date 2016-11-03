import { Component, OnInit } from '@angular/core';

import { CategoryService } from "./category.service";
import { Category } from "./category";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  name: string;
  desc: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    // this.categories = this.categoryService.getCategoriesStatic();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories,
      error => {
        console.log(error);
        alert(error);
      });
  }


  addCategory(): void {

    if (!this.name || !this.desc) return;
    this.categoryService.add({ "name": this.name, "desc": this.desc })
      .subscribe(category => this.categories.push(category),
      error => {
        console.log(error);
        alert(error);
      });
    this.name = "";
    this.desc = "";
  }

}

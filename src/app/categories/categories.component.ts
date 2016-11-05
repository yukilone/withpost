import { Component, OnInit } from '@angular/core';

import { CategoryService } from "./category.service";
import { Category } from "./category";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService, { provide: Window, useValue: window }]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  formData: Category;
  editData: Category;

  constructor(
    private categoryService: CategoryService) { }

  ngOnInit() {
    // this.categories = this.categoryService.getCategoriesStatic();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      },
      error => {
        console.log(error);
        alert(error);
      });
  }


  addCategory(): void {
    if (!this.formData) {
      this.formData = new Category();
      return;
    }
    if (!this.formData.name || !this.formData.desc) return;
    this.categoryService.add(this.formData)
      .subscribe(category => {
        alert("등록되었습니다.");
        this.categories.push(category);
        this.formData = null;
        this.editData = null;
      },
      error => {
        console.log(error);
        alert(error);
      });

  }


  editCategory(): void {
    this.categoryService.edit(this.editData)
      .subscribe(() => {
        this.getCategories();
        this.editData = null;
      },
      error => {
        console.log(error);
        alert(error);
      });
  }

  deleteCategory(_id: any): void {
    if (!confirm("정말로 삭제하시겠습니까?\n" +
      "이 카테고리에 존재하는 스토리가 있을경우 삭제되지 않습니다.")) return;
    console.log(_id);
    this.categoryService.delete(_id)
      .subscribe(() => {
        alert("삭제되었습니다.");
        this.categories = this.categories.filter(cate => {
          return !(_id === cate._id);
        });
      },
      error => {
        console.log(error);
        alert(error);
      });
  }

}

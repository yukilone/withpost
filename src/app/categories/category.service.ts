import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { Observable }  from "rxjs/Observable";

import { Category } from "./category";
import { CATEGORIES } from "./category.mock";



@Injectable()
export class CategoryService {
  private hostname = "shielded-tundra-34159.herokuapp.com";
  private categoriesUrl = "categories";
  constructor(private http: Http) { }


  getCategoriesStatic(): Category[] {
    return CATEGORIES;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get("shielded-tundra-34159.herokuapp.com/categories")
      .map(this.getData)
      .catch(this.handleErr);
  }

  add(newCate: { name: string, desc: string }): Observable<Category> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.hostname + "/" + this.categoriesUrl, newCate, options)
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
    console.error(error);
    return Observable.throw(errMsg);
  }


}

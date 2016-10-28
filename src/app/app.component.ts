import { Component, ViewContainerRef, OnInit, AfterContentInit } from '@angular/core';
import { MdlSnackbarService } from "angular2-mdl";

import { AppProgressService } from "./app.progress.service";
import { MenuService } from "./menu.service";
import { Menu } from "./menu";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'WithGG';
  toastMsg = "My First Toast Message";
  progress: { val: number };
  username: string;
  pw: string;

  menus: Menu[];





  constructor(
    private progressService: AppProgressService,
    private menuService: MenuService,
    private mdlSnackbarService: MdlSnackbarService,
    private vcRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.progress = this.progressService.getProgress();
    this.menus = this.menuService.getMainMenus();
  }


  ngAfterContentInit() {
    const int = setInterval(() => {
      if (this.progress.val >= 100) {
        console.log(this.progressService.getProgress());
        clearInterval(int);
      }
      else this.progress.val += 20;
    }, 100);
  }


  showSnackbar() {

    this.mdlSnackbarService.showSnackbar({
      message: this.toastMsg,
      action: {
        handler: () => {
          this.mdlSnackbarService.showToast('You hit the ok Button');
        },
        text: 'OK'
      }
    });
  }

  onDialogShow(dialogRef) {
    console.log("dialog showed.");
    console.log(dialogRef);
  }
  onDialogHide() {
    console.log("dialog hided.");
  }

  saveUser() {
    console.log("save User... : ", this.username);
  }



}

import { Injectable } from '@angular/core';

import { Menu } from "./menu";
import { MENUS } from "./menu.mock";

@Injectable()
export class MenuService {


  getMainMenus(): Menu[] {
    return MENUS;
  }
}

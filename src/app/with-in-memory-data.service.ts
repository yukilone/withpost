import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MENUS } from "./menu.mock";
import { STORIES } from "./story.mock";
import { Story } from "./story";

export class WithInMemoryDataService implements InMemoryDbService {

  createDb() {
    return {
      stories: STORIES,
      menus: MENUS
    };
  }

}

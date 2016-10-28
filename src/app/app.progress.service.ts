import { Injectable } from "@angular/core";


@Injectable()
export class AppProgressService {
  private progress: { val: number } = { val: 0 };

  getProgress(): { val: number } {
    return this.progress;
  }

  setProgress(addVal: number): void {
    this.progress.val += addVal;
  }


}

import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private utils: UtilsService) { }
  isInterrupted: boolean = false;

  scrollToTop(window:Window) {
    this.isInterrupted = false;
    let prevPos = window.scrollY;
    let pos = window.scrollY;
    let scrollToTop = window.setInterval(() => {
        prevPos = pos;
        pos = window.scrollY;
        if (prevPos - pos < 0) {
          this.isInterrupted = true;
        }
        if (pos > 0&&!this.isInterrupted) {
            window.scrollTo(0, this.utils.lerp(pos,0,0.005));
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
  scrollToTopFast(window:Window) {
    this.isInterrupted = false;
    let prevPos = window.scrollY;
    let pos = window.scrollY;
    let scrollToTop = window.setInterval(() => {
        prevPos = pos;
        pos = window.scrollY;
        if (prevPos - pos < 0) {
          this.isInterrupted = true;
        }
        if (pos > 0&&!this.isInterrupted) {
            window.scrollTo(0, this.utils.lerp(pos,0,0.05));
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
  scrollToBottom(window:Window) {
    this.isInterrupted = false;
    let prevPos = window.scrollY;
    let pos = window.scrollY;
    let scrollToTop = window.setInterval(() => {
        prevPos = pos;
        pos = window.scrollY;
        if (prevPos - pos > 0) {
          this.isInterrupted = true;
        }
        if (pos < window.document.body.scrollHeight&&!this.isInterrupted) {
            window.scrollTo(0, this.utils.lerp(pos,window.document.body.scrollHeight,0.03));
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
}

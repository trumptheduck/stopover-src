import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ScrollService } from '../core/services/scroll.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private scroller: ScrollService) {
    router.events.subscribe((val) => {
      this.scroller.scrollToTop(window);
  });
  }
  ngOnInit(): void {
  }

}

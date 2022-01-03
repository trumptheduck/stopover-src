import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private scroller: ScrollService) { }
  scrollToTop() {
    this.scroller.scrollToTopFast(window);
  }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoginPromptOpened: boolean = false;
  isBoxOpened: boolean = false;
  constructor(private scroller: ScrollService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthListener().subscribe({next: (isAuth:boolean)=> {
      if (isAuth) this.isLoginPromptOpened = false;
      this.isBoxOpened = false;
    }})
  }
  get isLoggedIn():boolean {
    return this.authService.isLoggedIn;
  }
  get userEmail():string {
    return this.authService.userEmail
  }
  scrollToBottom() {
    this.scroller.scrollToBottom(window);
  }
  change() {
    this.isBoxOpened = !this.isBoxOpened
    console.log(this.isBoxOpened);
  }
  logout() {
    this.authService.logout();
    this.authService.getAuthListener().pipe(first()).subscribe({next:()=>{location.reload}});
  }

}

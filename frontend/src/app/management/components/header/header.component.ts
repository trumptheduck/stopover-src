import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-dash-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashHeaderComponent implements OnInit {
  isBoxOpened: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  get isLoggedIn():boolean {
    return this.authService.isLoggedIn;
  }
  get userEmail():string {
    return this.authService.userEmail
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

import { Component } from '@angular/core';
import { fadeInAnimation } from './core/animations/fade.anim';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class AppComponent {
  title = 'frontend';
  constructor(private authService: AuthService) {
    this.authService.autoSignIn();
  }
}


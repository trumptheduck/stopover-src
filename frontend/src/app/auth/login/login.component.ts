import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = ""
  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
  }
  login() {
    this.authService.signin({
      email: this.email,
      password: this.password
    })
    this.password = "";
    this.authService.getAuthListener().pipe(first()).subscribe({next:(isAuth)=>{location.reload}});
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string = ""
  password: string = ""
  repassword: string = ""
  constructor(
    private Api: ApiService
  ) { }

  ngOnInit(): void {
  }
  validateEmail(email:string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  validatePassword(password:string) {
    return String(password)
    .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  }
  signup() {
    if (!this.validateEmail(this.email)) return alert("Email không hợp lệ!")
    if (!this.validatePassword(this.password)) return alert("Mật khẩu phải hơn 8 ký tự, có cả chữ và số!")
    if (this.password === this.repassword) {
      this.Api.post("/api/user/register",{
        email: this.email,
        password: this.password
      }).subscribe({
        next: (res) => {
          alert("Đăng ký thành công! Bạn có thể đăng nhập")
          this.email = "";
          this.password = "";
          this.repassword = "";
        },
        error: (err) => {
          alert(err.msg);
        }
      })
    } else {
      alert("Mật khẩu không khớp!");
    }
  }

}

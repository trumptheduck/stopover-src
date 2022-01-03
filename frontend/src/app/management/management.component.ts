import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(private authService: AuthService) { 
    this.authService.autoSignIn();
  }

  ngOnInit(): void {
  }

}

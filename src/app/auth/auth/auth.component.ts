import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';
  public error = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      this.authService.temporaryAdminAuth({email: this.username, password: this.password})
    } catch(e) {
      this.error = e;
    }
  }
}

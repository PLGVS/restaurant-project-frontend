import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginService) { }

  loginData: {
    login: String,
    password: String
  } = {
      login: '',
      password: ''
    }

  submitLogin() {
    const payload = {
      login: this.loginData.login,
      password: this.loginData.password
    }
    this.loginService.login(payload)
  }
}

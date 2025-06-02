import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:5000/auth/'

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(this.baseUrl + "login", loginData, { headers }).subscribe({
      next: (value) => {
        let token = value.token
        let userName = value.userName

        if (token != null) {
          localStorage.setItem("token", token)
          localStorage.setItem("userName", userName)
          this.router.navigate(['/dev'])
        }
      }
    })
  }

  validateToken(token: String) {
    return this.http.get<any>(this.baseUrl + "validate/" + token)
  }
}

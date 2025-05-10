import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:5000/menu/'

  constructor(private http: HttpClient) { }

  getDishes(categoryName: string): Observable<any> {
    console.log("Buscando dishes")
    console.log(categoryName)
    catchError((error) => {
      console.error('Erro: ', error);
      return throwError(() => new Error('Falha. Tente novamente mais tarde'));
    })
    return this.http.get<string[]>(this.baseUrl + categoryName + '/dishes')
  }
}

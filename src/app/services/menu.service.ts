import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:5000/menu/'

  constructor(private http: HttpClient) { }

  getCategories() {
    catchError((error) => {
      console.error('Erro: ', error);
      return throwError(() => new Error('Falha. Tente novamente mais tarde'));
    })
    return this.http.get<string[]>(this.baseUrl + 'categories')
  }

  getDishes(categoryName: string): Observable<any> {
    catchError((error) => {
      console.error('Erro: ', error);
      return throwError(() => new Error('Falha. Tente novamente mais tarde'));
    })
    return this.http.get<string[]>(this.baseUrl + categoryName + '/dishes')
  }

  addDish(category: string, dishData: any) {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

    return this.http.post<any>(this.baseUrl + category + "/add-dish", dishData, { headers }).pipe(
      catchError((error) => {
        console.error('Error: ', error);
        return throwError(() => new Error('Cannot add this dish!'));
      })
    )
  }

  deleteDish(category: string, dishName: string) {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

    return this.http.delete<any>(this.baseUrl + "delete/" + category + "/" + dishName, { headers }).pipe(
      catchError((error) => {
        console.error('Error: ', error);
        return throwError(() => new Error('Cannot delete this dish'))
      })
    )
  }
}

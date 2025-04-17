import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/reservation'

  constructor(private http: HttpClient) { }

  bookTable(reservationData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.baseUrl, reservationData, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao fazer a reserva: ', error);
        return throwError(() => new Error('Falha na reserva. Tente novamente mais tarde'));
      })
    )
  }

  getUnavailableTimes(params: HttpParams) {
    return this.http.get<string[]>(this.baseUrl + '/unavailable-times', { params })
  }
}

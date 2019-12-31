import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Warning } from '../models/warning';

@Injectable({
  providedIn: 'root'
})
export class WarningService {


  url = 'http://localhost:8090/api'; // api rest fake

  // injecting o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Getting all Warnings
  getWarnings(): Observable<Warning[]> {
    return this.httpClient.get<Warning[]>(this.url + '/warnings')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Get Warning by id
  getWarningById(id: number): Observable<Warning> {
    return this.httpClient.get<Warning>(this.url + '/warning/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create a new Warning
  createWarning(warning: Warning): Observable<Warning> {
    return this.httpClient.post<Warning>(this.url + '/warning', JSON.stringify(warning), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update Warning by ID
  updateWarning(warning: Warning): Observable<Warning> {
    return this.httpClient.put<Warning>(this.url + '/warning/' + warning.warning_id, JSON.stringify(warning), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Delete a car by ID
  deleteWarning(warning: Warning) {
    return this.httpClient.delete<Warning>(this.url + '/warning/' + warning.warning_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error Handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = error.error.message;
    } else {
      // server error
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

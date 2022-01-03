import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}
  getAuth() {
    var token = localStorage.getItem('token');
    if (token === null) {
      return "";
    } else {
      return token;
    }
  }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
      .get(`${environment.api_url}${path}`, { headers: header })
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
      .put(`${environment.api_url}${path}`, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
      .patch(`${environment.api_url}${path}`, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
      .post(`${environment.api_url}${path}`, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
      .delete(`${environment.api_url}${path}`,{headers: header})
      .pipe(catchError(this.handleError));
  }
  uploadImage(formdata: FormData) {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + this.getAuth())
    return this.http
    .post<any>(environment.api_url+"/api/image/upload", formdata, {headers: header})
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error.error);
  }
}
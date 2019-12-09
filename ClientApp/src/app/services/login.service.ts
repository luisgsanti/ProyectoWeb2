import { Injectable,Inject } from '@angular/core';

import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string ){}

  addLogin (loger: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl+'api/Login', loger, httpOptions).pipe(
    tap((newLogin: Login) => this.log(`added NewLogin w/ id=${newLogin.id}`)),
    catchError(this.handleError<Login>('addLogin'))
    );
  }

  getAll():Observable<Login[]>{
    
    return this.http.get<Login[]>(this.baseUrl+'api/Login').pipe(
    tap(_=>this.log('Se Consulta la información')),
    catchError(this.handleError<Login[]>('getAll',[]))
    );

  }

  getUsuario(user: string): Observable<Login>
  {
    const url = `${this.baseUrl + 'api/Login'}/${user}`;
    return this.http.get<Login>(url).pipe(
    tap(_ => this.log(`fetched Login Usuario=${user}`)),
    catchError(this.handleError<Login>(`getHero Usuario=${user}`))
    );
  }
  

  update (Login: Login): Observable<any> {
    const url =
    `${this.baseUrl + 'api/Login'}/${Login.id}`;
    return this.http.put(url, Login, httpOptions).pipe(
    tap(_ => this.log(`updated Login id=${Login.id}`)),
    catchError(this.handleError<any>('Login'))
    );
  }

  delete (Login: Login | number): Observable<Login> {
    const id = typeof Login === 'number' ? Login : Login.id;
    const url =
    
    `${this.baseUrl + 'api/Login'}/${id}`;
    
    return this.http.delete<Login>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted Login id=${id}`)),
    catchError(this.handleError<Login>('deleteLogin'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
    };
  }
  
  private log(message: string) {
      alert(`LoginService: ${message}`);
  }
}

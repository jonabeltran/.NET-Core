import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { UserloginInterface } from '../models/userlogin-interface';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.url;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: UserloginInterface){
    return this.http.post<UserloginInterface>(this.URL + '/api/login', user);
  }

  signIn(user: UserInterface){
    return this.http.post<UserInterface>(this.URL + '/users', user);
  }

  loggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  getId_user(): string{
    return localStorage.getItem('id_user');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    this.router.navigate(['/signin']);
  }
}

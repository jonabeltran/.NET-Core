import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    name: '',
    lastname: '',
    email: '',
    rol: '',
    password: ''
  };

  userLog = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){

    this.user.rol = 'client';
    this.authService.signIn(this.user)
    .subscribe(
      res =>{
        console.log(res);
        this.userLog.email = this.user.email;
        this.userLog.password = this.user.password;
        this.signUp();
      },
      err => console.log(err)
    );
  }

  signUp(){
    this.authService.signUp(this.userLog)
    . subscribe(
      res => {
         console.log(res.token);
         localStorage.setItem('token', res.token);
         this.router.navigate(['/country']);
      },
      err => console.log(err)
    );
 }
}

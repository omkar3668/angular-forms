import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  token:any ="hgjgjjgju4vcgbc"
  public loginForm ! : FormGroup
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router : Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
     localStorage.setItem('token', this.token);
     this.http.get<any>("http://localhost:3000/registerUsers")
     .subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      this.http.post<any>("http://localhost:3000/loginUsers",this.loginForm.value)
      .subscribe(res)
      if (user){
        alert("login successfully");
        // localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0MCwidXNlcm5hbWUiOiJzdW1tZXR0IiwiX2lkIjoiNjNkYTQzNjM5NzBmNTAwMGJkZmZjMjEwIiwiX192IjowfSwiaWF0IjoxNjc1MjQ4NDgzfQ.vG_ch_yl-2kemr_S6GnniwuQ-bY-PBhhAVlpDsMnr7g")
        // this.loginForm.value.email=="employee@gmail.com" ? localStorage.setItem('userType','employee'): localStorage.setItem('userType','admin')
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("user not found");
      }
     },err=>{
        alert("something went wrong !")
     })
  }

}

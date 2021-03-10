import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{DialogComponent} from './../dialog/dialog.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiCall: CommonServiceService,private router:Router,public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  logIn() {
    console.log(this.loginForm?.get('email')?.value);
    this.apiCall
      .userLoggedIn(
        this.loginForm?.get('email')?.value,
        this.loginForm?.get('password')?.value
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if(response.token){
            sessionStorage.setItem('token', response.token);
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '250px',
              data: {"message":"User Loged In Sucessfully"}
            });
            this.router.navigate(['userList'])
          }
        },
        (error) => {
          console.log(error);
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: {"message":error.error.error}
          });
          this.router.navigate([''])
        }
      );
  }
}

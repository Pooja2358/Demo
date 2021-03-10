import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{DialogComponent} from './../dialog/dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,public dialog: MatDialog) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('token')){
        return true;
      }else{
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: {"message":"User is not autorized"}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate([''])
        });
        return false;

      }

  }

}

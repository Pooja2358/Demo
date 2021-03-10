import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import {Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  asyncMeals!: Observable<any>;
  p: number = 1;
  total!: number;
  loading!: boolean;
  displayedColumns: string[] = ['id','imaageUrl','first_name','last_name', 'email'];

  constructor(private apiCall:CommonServiceService) { }

  ngOnInit(): void {
    this.getPage(1)
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = this.apiCall.userList(page).pipe(
        tap(res => {
            this.total = res.total;
            this.p = page;
            this.loading = false;
        }),
        map(res => res.data)
    );
}

}

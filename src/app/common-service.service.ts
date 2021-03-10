import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private httpClient: HttpClient) { }
  userLoggedIn(email:any,password:any){
    return this.httpClient.post("https://reqres.in/api/login",{
      "email": email,
      "password": password
  });
}

  userList(page:any):Observable<any>{
    return this.httpClient.get("https://reqres.in/api/users?page="+page)


}


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

/* Because we implement interceptor and provide header there
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions); Because we implement interceptor and provide header there

    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(userName: string) {
  // return this.http.get<Member>(this.baseUrl + 'users/' + userName , httpOptions);  Because we implement interceptor and provide header there

    return this.http.get<Member>(this.baseUrl + 'users/' + userName);
  }
}
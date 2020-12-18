import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  /* for accessing members everytime we look at a member an API call triggers, to avoid that and manage state
  of the application we implment member array and below methods with some checks*/
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions); Because we implement interceptor and provide header there
    // return this.http.get<Member[]>(this.baseUrl + 'users');
    if (this.members.length > 0) {
      return of(this.members); // of() returns observable
    }
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(userName: string) {
    // return this.http.get<Member>(this.baseUrl + 'users/' + userName , httpOptions);  Because we implement interceptor and provide header there

    const member = this.members.find(x => x.username === userName);
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + userName);
  }

  updateMember(member: Member) {
    // return this.http.put(this.baseUrl + 'users', member);
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() =>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}

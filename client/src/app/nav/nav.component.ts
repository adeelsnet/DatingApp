import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  model: any = {};
  // loggedIn: boolean;
  //currentUser$: Observable<User>; // instead of using getCurrentUser() we use this and ASYNC pipe in template

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // this.loggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
  }

/*  getCurrentUser(){
    // as best practice NOT to subscribe to a Non HTTP request because it never finish, instead we have to use ASYNC
    this.accountService.currentUser$.subscribe(user => {
      // !! used with an object returns boolean
       this.loggedIn = !!user;
    }, error => {
      console.log(error);
    });
  }*/
}

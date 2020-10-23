import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api/';

  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  /* we done below because of the issue from http:/2 issue for details https://github.com/angular/angular/issues/23334
    if (error.statusText === 'OK'){
      error.statusText = 'Not Found';
   } */

  get404Error() {
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe(Response => {
      console.log(Response);
    }, error => {
      if (error.statusText === 'OK') {
        error.statusText = 'Not Found';
      }
      console.log(error);
    });
  }
  get400Error() {
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe(Response => {
      console.log(Response);
    }, error => {
      if (error.statusText === 'OK') {
        error.statusText = 'Bad Request';
      }
      console.log(error);
    });
  }

  get500Error() {
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe(Response => {
      console.log(Response);
    }, error => {
      if (error.statusText === 'OK') {
        error.statusText = 'Internal Server Error';
      }
      console.log(error);
    });
  }

  get401Error() {
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe(Response => {
      console.log(Response);
    }, error => {
      if (error.statusText === 'OK') {
        error.statusText = 'Unauthorized';
      }
      console.log(error);
    });
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}account/register`, {}).subscribe(Response => {
      console.log(Response);
    }, error => {
      if (error.statusText === 'OK') {
        error.statusText = 'Bad Request';
      }
      console.log(error);
      this.validationErrors = error;
    });
  }
}

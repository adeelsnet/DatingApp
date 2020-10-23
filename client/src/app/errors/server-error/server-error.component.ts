import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  // There is only one place where we can hold router state and that is CONSTRUCTOR we can't access in OnInit
  constructor(private router: Router) {

    const navigation = this.router.getCurrentNavigation();

    // ? in between is called optional chianing operators, these work as optional and will not break the code if value doesn't exist
    // due to the optional ? operator.
    this.error = navigation?.extras?.state?.error;
   }

  ngOnInit(): void {
  }

}

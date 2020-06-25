import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public _authService: AuthService, private _alertify: AlertifyService) { }

  ngOnInit() {
  }
  login(){
   this._authService.login(this.model).subscribe(next => {
   this._alertify.success('logged in successfully');
    }, error => {
      this._alertify.error(error);
     });

  }
  loggedIn()
  {
    return this._authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this._alertify.message('logged out');
  }

}

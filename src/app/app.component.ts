import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DatingApp-SPA';
  // tslint:disable-next-line: variable-name
  constructor(private _authService: AuthService){}
  jwtHelper = new JwtHelperService();
  ngOnInit()
  {
    const token = localStorage.getItem('token');
    if ( token )
    {
        this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }
}

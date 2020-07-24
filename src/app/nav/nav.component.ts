import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public _authService: AuthService, private _alertify: AlertifyService,
    private _router: Router) { }

  ngOnInit() {
    this._authService.currentPhotoUrl.subscribe(url => this.photoUrl = url);
  }
  login(){
   this._authService.login(this.model).subscribe(next => {
   this._alertify.success('logged in successfully');
    }, error => {
      this._alertify.error(error);
     }, () => {
        this._router.navigate(['/members']);
      });

  }
  loggedIn()
  {
    return this._authService.loggedIn();
  }

  logout(){
    this._authService.currentUser = null;
    this._authService.decodedToken = null;
    localStorage.removeItem('token');
    this._alertify.message('logged out');
    this._router.navigate(['/home']);
  }

}

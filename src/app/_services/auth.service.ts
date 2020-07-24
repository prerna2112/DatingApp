import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root' //which module is providing this service
})
export class AuthService {
baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

changeMemberPhoto(url: string){
  this.photoUrl.next(url);
}

login(userr: User)
{
return  this.http.post(this.baseUrl + 'login', userr).pipe(
  map((Response: any) => {
    const user = Response;
        // tslint:disable-next-line: align
        if (user){
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);

        }
     })
  );
}
register(user: User)
{
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn()
{
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}

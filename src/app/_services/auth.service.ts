import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root' //which module is providing this service
})
export class AuthService {
baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }
decodedToken: any;

login(model: any)
{
return  this.http.post(this.baseUrl + 'login', model).pipe(
  map((Response: any) => {
    const user = Response;
        // tslint:disable-next-line: align
        if (user){
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
        }
     })
  );
}
register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn()
{
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}

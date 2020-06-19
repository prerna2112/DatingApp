import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //which module is providing this service
})
export class AuthService {
baseUrl = 'http://localhost:5000/api/auth/';
constructor(private http: HttpClient) { }
login(model: any)
{
return  this.http.post(this.baseUrl + 'login', model).pipe(
  map((Response: any) => {
    const user = Response;
        // tslint:disable-next-line: align
        if (user){
            localStorage.setItem('token', user.token);
        }
     })
  );
}
register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

}

import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router, private auth: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
      return  this.userService.getUser(this.auth.decodedToken.nameid)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving your data');
          this.router.navigate(['/members']); // redirect back to memebers page if error occurs
          return of(null);
        }

        )
      );
    }

}




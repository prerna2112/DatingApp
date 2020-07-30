import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{
  pageNumber = 1;
  pageSize = 5;
  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
      return  this.userService.getUsers(this.pageNumber, this.pageSize)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']); // redirect back to memebers page if error occurs
          return of(null);
        }

        )
      );
    }

}




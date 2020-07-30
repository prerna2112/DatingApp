import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResults } from '../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
user: User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'},{value: 'female', display: 'Females'}];
userParams: any = [];
paginationData: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.data.subscribe(data => {
      this.users = data['users'].result;
      this.paginationData = data['users'].pagination;
    });
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';

  }
  pageChangeEvent( event: any): void{
   this.paginationData.CurrentPage = event.page;
   this.loadUsers();
  }

  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }


  loadUsers()
  {
    this.userService.getUsers(this.paginationData.CurrentPage, this.paginationData.ItemsPerPage,
                              this.userParams
                              )
    .subscribe((users: PaginatedResults<User[]>) => {
      this.users = users.result;
      this.paginationData = users.pagination;
    }, error => {
      this.alertify.error( error);
    });
    console.log(this.users);
  }

}

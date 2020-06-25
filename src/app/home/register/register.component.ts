import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService} from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter ();
  model: any = {};

  constructor(private authService: AuthService , private alertify: AlertifyService) { }

  ngOnInit() {
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
  register()
  // tslint:disable-next-line: no-debugger
  { debugger;
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
    },
    error => {
     this.alertify.error(error);
    });
  }

}

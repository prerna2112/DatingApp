import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService} from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter ();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
  register()
  {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    },
    error =>{
      console.log('Error');
    });
  }

}

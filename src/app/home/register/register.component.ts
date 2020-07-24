import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { AuthService} from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { isRegExp } from 'util';
import { BsDatepickerConfig, BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter ();
  user: User;
  registerForm: FormGroup;


  constructor(private authService: AuthService , private alertify: AlertifyService, private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }
   createRegisterForm(){
      this.registerForm = this.fb.group({
       gender: ['male'],
       username: ['', Validators.required],
       knownAs: ['', Validators.required],
       dateOfBirth: [null, Validators.required],
       city: ['', Validators.required],
       country: ['', Validators.required],
       password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
       confirmPassword: ['', Validators.required]
     }, {Validator: this.passwordMatchValidator});
    }


  cancel()
  {
    this.cancelRegister.emit(false);
  }
  register()
  // tslint:disable-next-line: no-debugger
  {
    if (this.registerForm.valid){
        this.user =  Object.assign({}, this.registerForm.value);
        this.authService.register(this.user).subscribe(() => {
             this.alertify.success('Registration Successful!');
        }, error => {
             this.alertify.error('Some problem while registering user!');
        }, () => {
          // tslint:disable-next-line: no-debugger
          debugger;
          this.authService.login(this.user).subscribe(() => {
               this.router.navigate(['/members']);
          });
        });

    }
  }

  passwordMatchValidator(g: FormGroup){
   if (g.get('password').value === g.get('confirmPassword').value)
   {
     return null;
   }
   else
   {
    return {mismatch: true};
   }

  }
}

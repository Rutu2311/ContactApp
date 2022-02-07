import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailError: boolean = false;
  emailErrorStatus: string;
  loginFormFlag: boolean = false;
  LoginError: boolean = false;

  constructor(private _authService: AuthServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, Validators.required)
      }
    )
  }

  onSubmit() {
    this.loginFormFlag = true;
    let userCredential;
    this.emailErrorStatus = (this.loginForm.get('email').errors?.['email']) ? '*Enter valid email id' : '*Email id is required'
    if (this.loginForm.get('email').valid && this.loginForm.get('password').valid) {
      userCredential = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }
      this.LoginError = this._authService.loginUser(userCredential);
    }
  }

}

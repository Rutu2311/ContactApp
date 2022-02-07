import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  confirmPassword: boolean;
  emailExistFlag: boolean = false;
  submitFlag: boolean = false;
  passwordMatchFlag: boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        cpassword: new FormControl(null, Validators.required),
      },
      {
        validators: [this.passwordValidation],
      }
    );
  }
  //Email redundant Check
  emailRedundantCheck: ValidatorFn = (
    group: FormGroup
  ): ValidationErrors | null => {
    const listOfUsers = this._authService.getUser();
    const listOfEmails = listOfUsers.map((user) => {
      return user.email;
    });
    // console.log(group.get('email').value);
    if (listOfEmails.indexOf(group.get('email').value) != -1) {
      console.log(this.signupForm);
      console.log('Mail Already exist');
      return { emailAlreadyUsed: true };
    }
    return null;
  };

  //Password and Confirm password validation
  passwordValidation: ValidatorFn = (
    group: FormGroup
  ): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };
  emailInput() {
    this.emailExistFlag = false
  }
  constructor(private _authService: AuthServiceService) { }
  //Event when submit the form...
  onSubmit() {
    console.log(this.signupForm);

    this.submitFlag = true;

    //Email redundant Check
    const mail = this.signupForm.get('email').value;
    const listOfUsers = this._authService.getUser();
    this.emailExistFlag = listOfUsers.some((user) => {
      return user.email == mail;
    });
    const password = this.signupForm.get('password').value;
    const cpassword = this.signupForm.get('cpassword').value;
    this.passwordMatchFlag = (password == cpassword) ? false : true;
    if (!this.emailExistFlag && this.signupForm.valid) {
      const userDetail: object = {
        id: uuidv4(),
        name: this.signupForm.get('name').value,
        email: this.signupForm.get('email').value,
        password: this.signupForm.get('password').value,
      };
      this._authService.signupUser(userDetail);
      this.signupForm.reset();
      this.submitFlag = false
    }
  }
}

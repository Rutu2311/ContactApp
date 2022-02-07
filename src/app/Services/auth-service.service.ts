import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  localStorageData;
  constructor(private router: Router) { }

  getUser() {
    return (localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
  }
  isLogin() {
    return (sessionStorage.getItem('userCredentials')) ? true : false;
  }
  signupUser(userDetail: Object): void {
    this.localStorageData = this.getUser();
    this.localStorageData.push(userDetail);
    localStorage.setItem('users', JSON.stringify(this.localStorageData))
  }
  loginUser(userDetail: Object) {
    const allUsers = this.getUser();
    const loginStatus = allUsers.find((user) => {
      return (user.email == userDetail['email'] && user.password == userDetail['password'])
    })
    if (loginStatus == undefined) {
      return true;
    } else {
      const userCredentials = {
        id: loginStatus.id,
        name: loginStatus.name,
      }
      sessionStorage.setItem("userCredentials", JSON.stringify(userCredentials));
      this.router.navigate(['/dashboard'])
      return false;
    }
  }
  logout() {
    sessionStorage.removeItem('userCredentials');
    this.router.navigate(['/login'])
  }
}

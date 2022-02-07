import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  updateSubject = new BehaviorSubject<any>(this.getAllData());
  constructor() { }

  getLoggedInUserInfo() {
    return (sessionStorage.getItem('userCredentials')) ? (JSON.parse(sessionStorage.getItem('userCredentials'))) : null
  }
  getAllData() {
    return (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : [];
  }

  storeData(data: User) {
    this.updateSubject.next([...this.getAllData(), data]);
    localStorage.setItem('userData', JSON.stringify([...this.getAllData(), data]))
  }
  deleteContact(deleteId) {
    const localUserData = this.getAllData();
    const index = localUserData.findIndex((data) => {
      return data.id == deleteId
    })
    localUserData.splice(index, 1);
    this.updateSubject.next(localUserData)

    localStorage.setItem('userData', JSON.stringify(localUserData))
  }
  updateContact(updateId) {
    const localData = this.getAllData()
    const index = localData.findIndex((data) => {
      return data.id == updateId;
    })
    const beforeUpdateContact: User = {
      userid: localData[index].userid,
      id: localData[index].id,
      fname: localData[index].fname,
      lname: localData[index].lname,
      phone: localData[index].phone,
      image: localData[index].image
    }
    return beforeUpdateContact;
  }

}

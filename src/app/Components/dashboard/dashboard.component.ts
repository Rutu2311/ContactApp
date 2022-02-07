import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { CrudService } from 'src/app/Services/crud.service';
import { AddContact } from 'src/app/store/actions/user.action';
import { v4 as uuidv4 } from 'uuid';
import { User } from './../../Interfaces/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = JSON.parse(sessionStorage.getItem('userCredentials')).name;
  contactForm: FormGroup;
  submitFlag: boolean = false;
  editFlag: boolean = false;
  allowedImageTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  receivedImageType: string;
  imageTypeErrorStatus: boolean = true;
  userId: string = JSON.parse(sessionStorage.getItem('userCredentials')).id;
  allContactData: object[] = this._crudService.getAllData();
  path;
  imageUrl;
  oldContact: User;


  constructor(private _authService: AuthServiceService, private _crudService: CrudService, private store: Store) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),
      'image': new FormControl(null, Validators.required),
    })
  }

  userLogout(): void {
    this._authService.logout();
  }
  imageSubmit(something): void {
    console.log("Something: ", something);

    this.path = something.target.files[0];
    this.receivedImageType = something.target.files[0].type;
  }
  getControl(element: string): AbstractControl {
    return this.contactForm.get(element)
  }
  getImageUrl() {
    const reader = new FileReader();
    reader.readAsDataURL(this.path)
    this.imageUrl = new Promise((resolve) => {
      reader.addEventListener('load', () => {
        console.log(reader.result);
        resolve(reader.result);
      })
    })
    return this.imageUrl;
  }
  async onSubmit(): Promise<void> {
    this.submitFlag = true;
    this.imageTypeErrorStatus = (this.allowedImageTypes.some((type) => {
      return type == this.receivedImageType;
    }))
    if (this.imageTypeErrorStatus && this.contactForm.valid) {
      const newContact = {
        userid: this.userId,
        id: uuidv4(),
        fname: this.getControl('fname').value,
        lname: this.getControl('lname').value,
        phone: this.getControl('phone').value,
        imageName: this.path.name,
        image: await this.getImageUrl().then(res => {
          console.log("Res: ", this);
          return res;
        })
      }
      this.store.dispatch(new AddContact(newContact))
      this.contactForm.reset()
      this.submitFlag = false;
    }
  }
}

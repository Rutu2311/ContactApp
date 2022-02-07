import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { User } from 'src/app/Interfaces/user.model';
import { CrudService } from 'src/app/Services/crud.service';
import { UpdateContact } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-test-mat-dialog',
  templateUrl: './test-mat-dialog.component.html',
  styleUrls: ['./test-mat-dialog.component.scss'],
})
export class TestMatDialogComponent implements OnInit {
  path;
  receivedImageType: string;
  imageUrl;
  updateData;
  previewImageSrc;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _crudService: CrudService, private store: Store
  ) { }
  editContactForm: FormGroup;

  async imageSubmit(something): Promise<void> {
    console.log("Image Submit: ", something);

    this.path = something.target.files[0];
    console.log("path: ", this.path.name);

    this.receivedImageType = something.target.files[0].type;
    this.previewImageSrc = await this.getImageUrl().then(res => {
      return res;
    })
  }
  ngOnInit(): void {
    this.editContactForm = new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
      image: new FormControl(null),
    });
    const allOldContacts = this._crudService.getAllData();
    this.updateData = allOldContacts.find((oldData) => {
      return oldData.id == this.data;
    });
    console.log('Data the wil be update: ', this.updateData);

    this.editContactForm.patchValue({
      fname: this.updateData.fname,
      lname: this.updateData.lname,
      phone: this.updateData.phone,
      image: '',
    });
    this.previewImageSrc = this.updateData.image
  }
  getImageUrl() {
    const reader = new FileReader();
    reader.readAsDataURL(this.path);
    this.imageUrl = new Promise((resolve) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
    })
    return this.imageUrl;
  }

  async editFromMatDialog(): Promise<void> {
    this.store.dispatch(UpdateContact);
    // if (this.editContactForm.valid) {
    //   const userId = this._crudService.getLoggedInUserInfo();
    //   const updatedContact = {
    //     userid: userId.id,
    //     id: this.data,
    //     fname: this.editContactForm.get('fname').value,
    //     lname: this.editContactForm.get('lname').value,
    //     phone: this.editContactForm.get('phone').value,
    //     image: '',

    //   };
    //   if (this.editContactForm.get('image').value) {
    //     updatedContact['image'] = await this.getImageUrl().then(res => {

    //       return res;
    //     })
    //   } else {
    //     updatedContact['image'] = this.updateData.image;
    //   }
    //   const oldContacts = this._crudService.getAllData();
    //   const index = oldContacts.findIndex((contact) => {
    //     return contact.id == this.data;
    //   });
    //   oldContacts.splice(index, 1, updatedContact);
    //   this._crudService.updateSubject.next(oldContacts);
    //   localStorage.setItem('userData', JSON.stringify(oldContacts));

    // }
  }
}

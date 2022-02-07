import { Injectable } from '@angular/core'
import { State, Selector, Action, StateContext } from '@ngxs/store'
import { CrudService } from 'src/app/Services/crud.service';
import { User } from '../../Interfaces/user.model'
import { AddContact, DeleteContact, GetContacts, UpdateContact } from '../actions/user.action';
import { tap } from 'rxjs/operators'
import { state } from '@angular/animations';

//State Model
export class ContactStateModel {
  contacts: User[];
  contactsLoaded: boolean
}

//---------------------------------------------State---------------------------------------------
//State Decorator
@State<ContactStateModel>({
  name: 'contacts',
  defaults: {
    contacts: [],
    contactsLoaded: false,
  }
})
//State Class
@Injectable()
export class UserState {
  constructor(private _crudService: CrudService) { }

  // In State Selector() has logic to get state data

  // Selector for Get Contacts
  @Selector()
  static getAllContacts(state: ContactStateModel) {
    return state.contacts;
  }

  //get Employee loaded info
  @Selector()
  static contactLoaded(state: ContactStateModel) {
    return state.contactsLoaded;
  }
  // Get All Contacts
  @Action(GetContacts)
  getContacts({ getState, setState }: StateContext<ContactStateModel>) {
    const state = getState();
    setState({
      ...state,
      contacts: this._crudService.getAllData(),
      contactsLoaded: true
    })
  }

  // Add Contact
  @Action(AddContact)
  addContact({ getState, patchState }: StateContext<ContactStateModel>, { payload }: AddContact) {
    const state = getState();
    patchState({
      contacts: [...state.contacts, payload]
    })
    this._crudService.storeData(payload)
  }

  //Delete Contact
  @Action(DeleteContact)
  deleteContact({ getState }: StateContext<ContactStateModel>, { id }: DeleteContact) {
    console.log("from state method Delete Id: ", id);
    const state = getState();
    const deleteIndex = state.contacts.findIndex((contact) => {
      return contact.id == id;
    })
    console.log("Delete Index: ", deleteIndex);
    state.contacts.splice(deleteIndex, 1);
    this._crudService.deleteContact(id);
  }

  //Update Contact
  @Action(UpdateContact)
  updateContact({ getState, patchState })
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { CrudService } from 'src/app/Services/crud.service';
import { UserState } from 'src/app/store/state/user.state';
import { TestMatDialogComponent } from '../test-mat-dialog/test-mat-dialog.component';
import { DeleteContact, GetContacts } from './../../store/actions/user.action';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() userId: string = 'test';


  allData = [];
  @Select(UserState.getAllContacts) allData$: Observable<any>;
  @Select(UserState.contactLoaded) contactLoaded$: Observable<any>;
  updateId: string;
  constructor(private _crudService: CrudService, private matDialog: MatDialog, private store: Store) { }
  ngOnInit(): void {
    this.contactLoaded$.subscribe(res => {
      if (!res) {
        this.store.dispatch(new GetContacts())
      }
    })
  }
  //Open MatDialog
  openDialog(updateId) {
    this.matDialog.open(TestMatDialogComponent, {
      data: updateId
    });
  }
  deleteRecord(id: string) {
    console.log("Delete id: ", id);
    this.store.dispatch(new DeleteContact(id));
  }

}

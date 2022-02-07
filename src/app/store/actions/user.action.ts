import { User } from "src/app/Interfaces/user.model";

export class GetContacts {
  static readonly type = '[Contact] Get';
}

export class AddContact {
  static readonly type = '[Contact] Add';
  constructor(public payload: User) { }
}

export class DeleteContact {
  static readonly type = '[Contact] Delete';
  constructor(public id: string) { }
}

export class UpdateContact {
  static readonly type = '[Contact] update'
  constructor(public payload: User) { }
}

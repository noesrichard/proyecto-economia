import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'src/app/services/general.service';
import { Bank } from '../bank-form/bank-form.component';

export interface User {
  id: any;
  name: any;
  username: any;
  password: any;
  rol: any;
  bankId: any;
}

export const USER: User = {
  id: null,
  name: null,
  username: null,
  password: null,
  rol: null,
  bankId: null,
};
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User = { ...USER };
  @Input() cancelButton: boolean = true;

  banks: Bank[] = [];

  constructor(private general: GeneralService, private snack: MatSnackBar) {}

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.general.get('banks').subscribe((response: Bank[]) => {
      this.banks = response;
    });
  }

  validate(): boolean {
    if (
      this.user.name == null ||
      this.user.username == null ||
      this.user.password == null ||
      this.user.rol == null ||
      this.user.bankId == null
    ) {
      this.snack.open('No pueden haber campos vacios', 'Ok');
      return false;
    }
    return true;
  }

  handleSave() {
    if (this.validate()) {
      this.onSave.emit(this.user);
    }
  }
}

@Component({
  selector: 'app-user-form-dialog',
  template: `<app-user-form
    [user]="user"
    (onSave)="dialogRef.close($event)"
    (onCancel)="dialogRef.close()"
  ></app-user-form>`,
})
export class UserFormDialogComponent implements OnInit {
  user: User = { ...USER };
  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}
  ngOnInit(): void {
    if (this.data.user) {
      this.user = this.data.user;
    }
    if (this.data.rol) {
      this.user.rol = this.data.rol;
    }
  }
}

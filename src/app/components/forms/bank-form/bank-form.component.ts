import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { map, startWith } from 'rxjs/operators';
import { User } from '../user-form/user-form.component';

export const BANK = {
  id: null,
  name: null,
  educacion: null,
  micro: null,
  hipo: null,
  consumo: null,
  educacionPlazo: null,
  microPlazo: null,
  hipoPlazo: null,
  consumoPlazo: null,
};

export interface Bank {
  id: string | null;
  name: string | null;
  educacion: string | null;
  micro: string | null;
  hipo: string | null;
  consumo: string | null;
  educacionPlazo: string | null;
  microPlazo: string | null;
  hipoPlazo: string | null;
  consumoPlazo: string | null;
}

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css'],
})
export class BankFormComponent implements OnInit {
  @Input() bank: Bank = { ...BANK };
  @Input() cancelButton: boolean = true;
  isAdmin: boolean = localStorage.getItem('rol') == 'admin';
  asesors: User[] = [];

  asesorControl: FormControl = new FormControl();

  filteredOptions?: Observable<User[]>;

  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  constructor(private general: GeneralService) {}

  ngOnInit(): void {
  }


  handleSave(){
    this.onSave.emit(this.bank)
  }

}

@Component({
  selector: 'app-bank-form-dialog',
  template: `<app-bank-form
    [bank]="bank"
    (onSave)="dialogRef.close($event)"
    (onCancel)="dialogRef.close()"
  ></app-bank-form>`,
})
export class BankFormDialogComponent implements OnInit {
  bank: Bank = { ...BANK };
  constructor(
    public dialogRef: MatDialogRef<BankFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}
  ngOnInit(): void {
    if (this.data.bank) {
      this.bank = this.data.bank;
    }
  }
}

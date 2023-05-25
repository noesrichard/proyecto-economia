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
import { SecurityService } from 'src/app/services/security.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const BANK = {
  id: null,
  name: null,
  educacion: 0,
  micro: 0,
  hipo: 0,
  consumo: 0,
  educacionPlazo: 12,
  microPlazo: 12,
  hipoPlazo: 12,
  consumoPlazo: 12,
};

export interface Bank {
  id: string | null;
  name: string | null;
  educacion: number;
  micro: number;
  hipo: number;
  consumo: number;
  educacionPlazo: number;
  microPlazo: number;
  hipoPlazo: number;
  consumoPlazo: number;
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

  constructor(
    private general: GeneralService,
    private security: SecurityService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin =
      this.security.decrypt(localStorage.getItem('rol')) == 'admin';
  }

  validate(): boolean {
    if (
      this.bank.educacion <= 100 &&
      this.bank.educacion >= 0 &&
      this.bank.micro <= 100 &&
      this.bank.micro >= 0 &&
      this.bank.hipo <= 100 &&
      this.bank.hipo >= 0 &&
      this.bank.consumo <= 100 &&
      this.bank.consumo >= 0
    ) {
      return true;
    }
    this.snack.open('No pueden haber tasas mayores a 100 o menores a 0', 'Ok');
    return false;
  }

  validateNombre(): boolean {
    if (this.bank.name != null) {
      return true;
    }
    this.snack.open('El nombre no puede estar vacio', 'Ok');
    return false;
  }

  validatePlazos(): boolean {
    if (
      this.bank.educacionPlazo >= 1 &&
      this.bank.microPlazo >= 1 &&
      this.bank.hipoPlazo >= 1 &&
      this.bank.consumoPlazo >= 1
    ) {
      return true;
    }
    this.snack.open('No pueden plazos menores a 1', 'Ok');
    return false;
  }
  handleSave() {
    if (this.validate() && this.validatePlazos() && this.validateNombre()) {
      this.onSave.emit(this.bank);
    }
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import {
  Bank,
  BankFormComponent,
  BankFormDialogComponent,
} from 'src/app/components/forms/bank-form/bank-form.component';
import { BANK_COLUMNS } from 'src/app/components/table/table.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.css'],
})
export class BankViewComponent {
  banks: Bank[] = [];
  bankColumns = BANK_COLUMNS;
  URL = 'banks';

  rol = localStorage.getItem('rol');
  userId = localStorage.getItem('userId');

  newButton = true;
  editButton = true;
  deleteButton = true;

  constructor(private api: GeneralService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
    if (this.rol == 'asesor') {
      console.log("Asesor")
      this.newButton = false;
      this.deleteButton = false;
    }
  }

  fetchData() {
    this.api.get(this.URL).subscribe({
      next: (response: Bank[]) => {
        this.banks = response;
      },
    });
  }

  handleDelete(row: any) {
    const ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.api.delete(this.URL, row).subscribe((r) => {
          this.fetchData();
        });
      }
    });
  }
  handleEdit(row: any) {
    const ref = this.dialog.open(BankFormDialogComponent, {
      data: { bank: { ...row } },
    });
    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.api.update(this.URL, response).subscribe((response) => {
          this.fetchData();
        });
      }
    });
  }

  handleNew() {
    const ref = this.dialog.open(BankFormDialogComponent);
    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.api.create(this.URL, response).subscribe((response) => {
          this.fetchData();
        });
      }
    });
  }
}

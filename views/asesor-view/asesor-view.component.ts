import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import {
  User,
  UserFormDialogComponent,
} from 'src/app/components/forms/user-form/user-form.component';
import { USER_COLUMNS } from 'src/app/components/table/table.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-asesor-view',
  templateUrl: './asesor-view.component.html',
  styleUrls: ['./asesor-view.component.css'],
})
export class AsesorViewComponent {
  asesors: User[] = [];
  asesorColumns = USER_COLUMNS.filter((c) => c.columnDef != 'rol');
  URL = 'users';

  constructor(private api: GeneralService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.api.get(this.URL).subscribe({
      next: (response: User[]) => {
        this.asesors = response.filter((u) => u.rol == 'asesor');
      },
    });
  }

  handleDelete(row: any) {
    const ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.api.delete(this.URL, row).subscribe({
          next: (r) => {
            this.fetchData();
          },
          error: (r) => {
            this.fetchData();
          }
        });
      }
    });
  }
  handleEdit(row: any) {
    const ref = this.dialog.open(UserFormDialogComponent, {
      data: { user: { ...row }, rol: 'asesor' },
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
    const ref = this.dialog.open(UserFormDialogComponent, {
      data: { rol: 'asesor' },
    });
    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.api.create(this.URL, response).subscribe((response) => {
          this.fetchData();
        });
      }
    });
  }
}

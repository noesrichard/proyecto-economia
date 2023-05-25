import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsesorViewComponent } from './views/asesor-view/asesor-view.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenu, MatMenuModule} from '@angular/material/menu';

import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  BankFormComponent,
  BankFormDialogComponent,
} from './components/forms/bank-form/bank-form.component';
import { UserFormComponent, UserFormDialogComponent } from './components/forms/user-form/user-form.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { AppViewComponent } from './views/app-view/app-view.component';
import { BankViewComponent } from './views/bank-view/bank-view.component';
import { ConfigViewComponent } from './views/config-view/config-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AsesorViewComponent,
    UserViewComponent,
    TableComponent,
    InputComponent,
    BankFormComponent,
    UserFormComponent,
    ConfirmDialogComponent,
    BankFormDialogComponent,
    LoginViewComponent,
    SimuladorComponent,
    AppViewComponent,
    BankViewComponent,
    UserFormDialogComponent,
    ConfigViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

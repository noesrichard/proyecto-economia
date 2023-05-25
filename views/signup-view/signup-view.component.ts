import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { USER } from 'src/app/components/forms/user-form/user-form.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css'],
})
export class SignupViewComponent {
  user = { ...USER };

  repeatPassword = null;

  constructor(
    private general: GeneralService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  validate() {
    return (
      this.user.password == null ||
      this.user.username == null ||
      this.user.name == null
    );
  }

  handleSignup() {
    if( this.validate()){
      this.snack.open('Ingrese todos los campos', 'Ok');
      return;
    }
    if (this.repeatPassword != this.user.password ) {
      this.snack.open('Las contraseñas no coinciden', 'Ok');
      return;
    }
    this.general.create('users', this.user).subscribe((res) => {
      this.router.navigate(['']);
    });
  }
}

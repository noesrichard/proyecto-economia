import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/components/forms/user-form/user-form.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent {
  username: string | null = null;
  password: string | null = null;

  constructor(private general: GeneralService, private router: Router) {}

  handleLogin() {
    this.general.get('users').subscribe((response: User[]) => {
      const user = response.find(
        (u) => u.username == this.username && u.password == this.password
      );
      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('name', user.name);
        localStorage.setItem('rol', user.rol);
        localStorage.setItem('bankId', user.bankId);
        this.router.navigate(['home']);
      } else {
        alert('No se encuentra');
      }
    });
  }
}

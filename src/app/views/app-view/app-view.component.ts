import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bank } from 'src/app/components/forms/bank-form/bank-form.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css'],
})
export class AppViewComponent implements OnInit {
  rol = localStorage.getItem('rol');
  username = localStorage.getItem('username');
  name = localStorage.getItem('name');

  bankName: string | null = 'Banco';

  constructor(private router: Router, private general: GeneralService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['']);
    }
    const bankId = localStorage.getItem('bankId');
    this.general.get('banks/' + bankId).subscribe((response: Bank) => {
      this.bankName = response.name;
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

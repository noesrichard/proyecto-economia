import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BANK,
  Bank,
} from 'src/app/components/forms/bank-form/bank-form.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.css'],
})
export class ConfigViewComponent implements OnInit {
  bank: Bank = { ...BANK };
  constructor(private general: GeneralService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    const bankId = localStorage.getItem('bankId');
    console.log(bankId);
    const url = `banks/${bankId}`;
    console.log(url);
    this.general.get(url).subscribe((response: Bank) => {
      console.log(response);
      this.bank = response;
    });
  }

  handleSave() {
    this.general.update('banks', this.bank).subscribe((response) => {
      this.snack.open("Se edito con exito", "Ok")
    });
  }
}

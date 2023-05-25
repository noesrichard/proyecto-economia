import { Component, OnInit } from '@angular/core';
import { switchAll, window } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Bank } from '../forms/bank-form/bank-form.component';
import { SISTEMA_COLUMNS } from '../table/table.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SecurityService } from 'src/app/services/security.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent implements OnInit {
  simulation: Simulation = { ...SIMULATION };
  rol = localStorage.getItem('rol');
  bankName: string | null = 'Banco';

  banks: Bank[] = [];
  maxValue: number | string | null = 12;

  creditOptions: { id: any; name: any; tasa: any; plazo: any }[] = [];

  sistema: {
    periodo: string;
    cuota: string;
    interes: string;
    amortizacion: string;
    saldo: string;
  }[] = [];
  columns = SISTEMA_COLUMNS;

  constructor(
    private general: GeneralService,
    private security: SecurityService,
    private snack: MatSnackBar
  ) {}

  setCreditOptions(bank: any) {
    this.creditOptions = [
      {
        id: 0,
        name: 'Educacion',
        tasa: bank.educacion,
        plazo: bank.educacionPlazo,
      },
      { id: 1, name: 'Hipotecario', tasa: bank.hipo, plazo: bank.hipoPlazo },
      { id: 2, name: 'Microcredito', tasa: bank.micro, plazo: bank.microPlazo },
      { id: 3, name: 'Consumo', tasa: bank.consumo, plazo: bank.consumoPlazo },
    ];
  }

  ngOnInit(): void {
    this.rol = this.security.decrypt(this.rol);
    if (this.rol == 'asesor') {
      const bankId = localStorage.getItem('bankId');
      this.simulation.bank = bankId;
      this.general.get('banks/' + bankId).subscribe((response: Bank) => {
        this.bankName = response.name;
        this.setCreditOptions(response);
      });
    } else {
      this.fetchBanks();
    }
    this.simulation.name = localStorage.getItem('name')?.toString() ?? '';
  }

  fetchBanks() {
    this.general.get('banks').subscribe((response: Bank[]) => {
      this.banks = response;
    });
  }

  handleBankChange(event: any) {
    this.simulation.bank = event;
    const bank = this.banks.find((b) => b.id == this.simulation.bank);
    this.simulation.credit = null;
    this.setCreditOptions(bank);
  }

  handleCreditChange(event: any) {
    this.simulation.credit = event;
    this.setMaxValue();
  }

  credito: string = 'Educacion';

  setMaxValue() {
    const bank = this.banks.find((b) => b.id == this.simulation.bank);
    console.log('Banco: ', bank);
    this.maxValue = this.creditOptions.find(
      (c) => c.id == this.simulation.credit
    )?.plazo;
  }

  validate() {
    return !(
      this.simulation.name == null ||
      this.simulation.cantidad == null ||
      this.simulation.type == null ||
      this.simulation.bank == null ||
      this.simulation.credit == null ||
      this.simulation.plazo == null
    );
  }

  handleCal() {
    console.log('Simulacion: ', this.simulation);
    if (
      !this.validate() ||
      (this.maxValue != null && this.simulation.plazo > this.maxValue)
    ) {
      this.snack.open('Plazo no valido', 'Ok');
      return;
    }

    this.sistema = [];
    console.log('Sistema: ', this.simulation);

    var seguro = +(this.simulation.seguro ?? 0);
    var cp = +(this.simulation.cantidad ?? 0);
    var n = parseInt(this.simulation.plazo) ?? 0;
    var porcentajeInteres = this.creditOptions.find(
      (c) => c.id == this.simulation.credit
    )?.tasa;

    var saldo = cp;
    var i = porcentajeInteres / 100;
    var i_mensual = i / 12;
    var saldoAnterior = cp;
    var cuota, interes, capital, pow, frac;
    console.log('Cp: ', cp);
    console.log('n: ', n);
    console.log('i: ', i);

    for (var periodo = 1; periodo <= this.simulation.plazo; periodo++) {
      if (this.simulation.type == 'frances') {
        pow = 1 + i_mensual;
        frac = i_mensual / (1 - Math.pow(pow, -n));
        cuota = cp * frac + seguro;
        interes = (saldo * i) / 12;
        capital = cuota - interes;
      } else {
        console.log('CP: ', cp);
        console.log('seguro: ', seguro);
        console.log('n: ', n);
        capital = (cp + seguro) / n;
        interes = (saldo * i) / 12;
        cuota = capital + interes;
      }
      saldo = saldoAnterior - capital;
      console.log(cuota, interes, capital, saldo);
      this.sistema.push({
        periodo: periodo.toString(),
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        amortizacion: capital.toFixed(2),
        saldo: saldo.toFixed(2),
      });
      saldoAnterior = saldo;
    }
  }

  imprimir() {
    let doc = new jsPDF();

    let data: any[] = [];
    const headers = this.columns.map((c: any) => c.header);
    const columns = this.columns.map((c: any) => c.columnDef);

    this.sistema.forEach((row: any) => {
      let arr: any[] = [];
      columns.forEach((column: any) => {
        arr.push(row[column]);
      });
      data.push(arr);
    });
    const bank = this.banks.find((b) => b.id == this.simulation.bank);
    let y = 10;
    let i = 10;
    const porcentaje = this.creditOptions.find(
      (c) => c.id == this.simulation.credit
    )?.tasa;
    doc.text('Nombre: ' + this.simulation.name, 10, y);
    doc.text('Banco: ' + bank?.name, 10, y + i);
    doc.text('Cantidad: ' + this.simulation.cantidad, 10, y + i * 2);
    doc.text('Sistema: ' + this.simulation.type.toUpperCase(), 10, y + i * 4);
    doc.text(
      'Credito: ' + this.credito + '(' + porcentaje + '%)',
      10,
      y + i * 5
    );

    autoTable(doc, {
      startY: y + i * 6,
      head: [[...columns]],
      body: [...data],
    });

    doc.save('amortizacion.pdf');
  }
}

export interface Simulation {
  name: string;
  bank: string | number | null;
  credit: any;
  type: any;
  plazo: any;
  cantidad: number | null;
  seguro: number | null;
}

export const SIMULATION: Simulation = {
  name: '',
  bank: null,
  credit: null,
  type: null,
  plazo: null,
  cantidad: null,
  seguro: null,
};

import { Component, OnInit } from '@angular/core';
import { switchAll, window } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Bank } from '../forms/bank-form/bank-form.component';
import { SISTEMA_COLUMNS } from '../table/table.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  constructor(private general: GeneralService) {}

  setCreditOptions(bank: any) {
    this.creditOptions = [
      { id: 0, name: 'Educacion', tasa: bank.educacion, plazo: bank.educacionPlazo, },
      { id: 1, name: 'Hipotecario', tasa: bank.hipo, plazo: bank.hipoPlazo },
      { id: 2, name: 'Microcredito', tasa: bank.micro, plazo: bank.microPlazo },
      { id: 3, name: 'Consumo', tasa: bank.consumo, plazo: bank.consumoPlazo },
    ];
  }

  ngOnInit(): void {
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
    console.log("Banco: ", bank)
    this.maxValue = this.creditOptions.find(c => c.id == this.simulation.credit)?.plazo;
  }

  validate() {
    return !(
      this.simulation.name == null ||
      this.simulation.cantidad == null ||
      this.simulation.seguro == null ||
      this.simulation.type == null ||
      this.simulation.bank == null ||
      this.simulation.credit == null ||
      this.simulation.plazo == null
    );
  }

  handleCal() {
    console.log("Simulacion: ", this.simulation)
    if (!this.validate() || this.maxValue != null && this.simulation.plazo > this.maxValue) {
      alert('No es valido');
      return;
    }

    var seguro = +(this.simulation.seguro ?? 1);
    var cantidadInicial = +(this.simulation.cantidad ?? 1);
    var tiempo = parseInt(this.simulation.plazo) ?? 1;

    this.sistema = [];

    var porcentaje = this.creditOptions.find(
      (c) => c.id == this.simulation.credit
    )?.tasa;
    var saldoPendiente = cantidadInicial;
    var tasaInteres = porcentaje / 100;
    var cuota, interes, amortizacion;

    for (var periodo = 1; periodo <= this.simulation.plazo; periodo++) {
      if (this.simulation.type == 'frances') {
        cuota =
          cantidadInicial *
            (tasaInteres / (1 - Math.pow(1 + tasaInteres, -tiempo))) +
          seguro;
        interes = saldoPendiente * tasaInteres;
        amortizacion = cuota - interes;
      } else {
        cuota = (cantidadInicial + seguro) / tiempo;
        interes = saldoPendiente * tasaInteres;
        amortizacion = cuota - interes;
      }
      saldoPendiente -= amortizacion;

      this.sistema.push({
        periodo: periodo.toString(),
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        amortizacion: amortizacion.toFixed(2),
        saldo: saldoPendiente.toFixed(2),
      });
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
    doc.text('Seguro: ' + this.simulation.seguro, 10, y + i * 3);
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

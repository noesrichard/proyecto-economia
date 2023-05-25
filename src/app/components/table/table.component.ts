import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() select = true;
  @Input() rows: any;
  @Input() columns: any;

  @Input() editButton: boolean = true;
  @Input() deleteButton: boolean = true;
  @Input() newButton: boolean = true;
  @Input() search: boolean = true;
  @Input() showPaginator: boolean = true;
  @Input() sorting: boolean = true;

  dataSource: any = new MatTableDataSource([]);
  displayedColumns: any[] = [];

  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onNew: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.setupTable();
  }

  ngOnInit(): void {
    this.setupTable();
  }

  setupTable() {
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
    if (this.editButton) {
      this.displayedColumns.push('edit');
    }
    if (this.deleteButton) {
      this.displayedColumns.push('delete');
    }
    this.dataSource = new MatTableDataSource(this.rows);
    if (this.showPaginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sorting) {
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleAction(row: any) {
    this.onAction.emit(row);
  }

  handleEdit(row: any) {
    this.onEdit.emit(row);
  }

  handleDelete(row: any) {
    this.onDelete.emit(row);
  }

  handleNew() {
    this.onNew.emit();
  }
}

interface Column {
  columnDef: string;
  header: string;
  cell: (row: any) => any;
}

export const SISTEMA_COLUMNS: Column[] = [
  { columnDef: 'periodo', header: 'Periodo', cell: (row: any) => row.periodo },
  { columnDef: 'cuota', header: 'Cuota', cell: (row: any) => row.cuota },
  { columnDef: 'interes', header: 'Interes', cell: (row: any) => row.interes },
  {
    columnDef: 'amortizacion',
    header: 'Amortizacion',
    cell: (row: any) => row.amortizacion,
  },
  { columnDef: 'saldo', header: 'Saldo', cell: (row: any) => row.saldo },
];

export const BANK_COLUMNS = [
  { columnDef: 'name', header: 'Nombre', cell: (row: any) => row.name },
  {
    columnDef: 'educacion',
    header: 'Educacion',
    cell: (row: any) => row.educacion,
  },
  { columnDef: 'micro', header: 'Micro', cell: (row: any) => row.micro },
  { columnDef: 'hipo', header: 'Hipo', cell: (row: any) => row.hipo },
  { columnDef: 'consumo', header: 'Consumo', cell: (row: any) => row.consumo },
  {
    columnDef: 'educacionPlazo',
    header: 'Plazo eduacacion',
    cell: (row: any) => row.educacionPlazo,
  },
  {
    columnDef: 'microPlazo',
    header: 'Plazo micro',
    cell: (row: any) => row.microPlazo,
  },
  {
    columnDef: 'hipoPlazo',
    header: 'Plazo hipo',
    cell: (row: any) => row.hipoPlazo,
  },
  {
    columnDef: 'consumoPlazo',
    header: 'Plazo consumo',
    cell: (row: any) => row.consumoPlazo,
  },
];

export const USER_COLUMNS = [
  { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
  { columnDef: 'name', header: 'Nombre', cell: (row: any) => row.name },
  {
    columnDef: 'username',
    header: 'Usuario',
    cell: (row: any) => row.username,
  },
  {
    columnDef: 'password',
    header: 'Contraseña',
    cell: (row: any) => row.password,
  },
  {
    columnDef: 'rol',
    header: 'Rol',
    cell: (row: any) => row.rol.toUpperCase(),
  },
  { columnDef: 'bankId', header: 'Banco', cell: (row: any) => row.bankId },
];

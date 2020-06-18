import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PedidosListaService } from './pedidos-lista.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface PeriodicElement {

  Id: number;
  Tipo: string;
  CodigoArticulo: string;
  Nombre: string;
  Comprobante: string;
  FechaEntrega: string;
  Prov: string;
  Loc: string;
  Estado: string;
  Etapa: string;
  Lote: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Id: 1,Tipo: "Venta", CodigoArticulo: "ATCLLED110", Nombre: "TCL LED 50\" P8M SMART",    Comprobante: "B0001700006163",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 2,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 3,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Minamar",    Estado: "EN PROCESO",    Etapa: "EN LOTE",    Lote: 4},
  {Id: 4,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "EN PROCESO",    Etapa: "ESTANTERIA", Lote: 3},
  {Id: 5,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "ANULADO",       Etapa: "SIN STOCK",  Lote: 0},
];

@Component({  
  selector: 'app-pedidos-lista',  
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.scss']
})

export class PedidosListaComponent implements OnInit {

  displayedColumns: string[] = ['select', 'Tipo', 'Codigo-Articulo-Nombre', 'Comprobante', 'Fecha-Entrega', 'Prov-Loc', 'Estado-Etapa', 'Lote', 'Borrar'];
  dataSource = ELEMENT_DATA;  
  selection = new SelectionModel<PeriodicElement>(true, []);


  /*
  Filtros
   */
  filtroTipos: any;
  selectedTipo: any;
  
  filtroTurnos: any;
  selectedTurno: any;
  
  filtroOrigenes: any;
  selectedOrigen: any;

  filtroEstados: any;
  selectedEstado: any;

  filtroEtapas: any;
  selectedEtapa: any;

  filtroProvincias: any;
  selectedProvincia: any = 1;

  filtroLocalidades: any;
  selectedLocalidad: any = 1402;

  pickerFiltroDesde:any;
  pickerFiltroHasta:any;

  constructor(private _router: Router, private _fuseSidebarService: FuseSidebarService, private _pedidosListaService: PedidosListaService) { }

  ngOnInit(): void {
    this._pedidosListaService.getAllTipos().subscribe(params => {
      this.selectedTipo = 0;
      this.filtroTipos = params.datos;
    })
    
    this._pedidosListaService.getAllTurnos().subscribe(params => {
      this.selectedTurno = 0;
      this.filtroTurnos = params.datos;
    })
    
    this._pedidosListaService.getAllOrigenes().subscribe(params => {
      this.selectedOrigen = 0;
      this.filtroOrigenes = params.datos;
    })

    this._pedidosListaService.getAllEstados().subscribe(params => {
      this.selectedEstado = 0;
      this.filtroEstados = params.datos;
    })

    this._pedidosListaService.getAllEtapas().subscribe(params => {
      this.selectedEtapa = 0;
      this.filtroEtapas = params.datos;
    })

    this._pedidosListaService.getAllProvincias().subscribe(params => {
      this.filtroProvincias = params.datos;

    })
    
    this._pedidosListaService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
      this.selectedLocalidad ;
      this.filtroLocalidades = params.datos;
    })
    
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    console.log("Tipo: "+this.selectedTipo);
  }
  
  selectTurno(event: Event) {
    this.selectedTurno = (event.target as HTMLSelectElement).value;
    console.log("Turno: "+this.selectedTurno);
  }
  
  selectOrigen(event: Event) {
    this.selectedOrigen = (event.target as HTMLSelectElement).value;
    console.log("Origen: "+this.selectedOrigen);
  }
  
  selectEstado(event: Event) {
    this.selectedEstado = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Estado
      console.log("Buscar Estado");
    }
    console.log("Estado: "+this.selectedEstado);
  }

  selectEtapa(event: Event) {
    this.selectedEtapa = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Etapa
      console.log("Buscar Etapa");
    } else {

    }
    console.log("Etapa: "+this.selectedEstado);
  }

  selectProvincia(event: Event) {
    this.selectedProvincia = (event.target as HTMLSelectElement).value;
    if(this.selectedProvincia !== 0){
      //Buscar Localidad
      console.log("Buscar Provincia");
    } else {

    }
    console.log("Provincia: "+this.selectedProvincia);
  }

  selectLocalidad(event: Event) {
    this.selectedLocalidad = (event.target as HTMLSelectElement).value;
    if(this.selectedLocalidad !== 0){
      //Buscar Provincia
      console.log("Buscar Localidad");
    } else {

    }
    console.log("Localidad: "+this.selectedLocalidad);
  }

  selectFiltroDesde(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    console.log(this.pickerFiltroDesde);
  }

  buscar(){
    console.log("buscar");
  }

  search( event ) {
    let search: any = document.getElementById('search');
    let busqueda = search.value;
    console.log(busqueda);
  }

  consultar(){
    let ruta = `apps/pedidos/administracion/visualizacion/${1}`;
    this._router.navigate([ruta]);
  }

  confirmacionBorrar(){
    console.log("borrar");
  }

  crearLote() {

    console.log(this.selection);
    
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }


    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }  
}

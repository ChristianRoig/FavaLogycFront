import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CrearOrdenDistribucionService } from './crear-orden-distribucion.service';

export interface Articulos {

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

export interface BodyDetalle{

  idTipo : number;
  idDarsena : number;
  desdePedido : string;
  hastaPedido : string;
}

const ELEMENT_DATA: Articulos[] = [
  {Id: 1,Tipo: "Venta", CodigoArticulo: "ATCLLED110", Nombre: "TCL LED 50\" P8M SMART",    Comprobante: "B0001700006163",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 2,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 3,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Minamar",    Estado: "EN PROCESO",    Etapa: "EN LOTE",    Lote: 4},
  {Id: 4,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "EN PROCESO",    Etapa: "ESTANTERIA", Lote: 3},
  {Id: 5,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "ANULADO",       Etapa: "SIN STOCK",  Lote: 0},
];

@Component({  
  selector: 'app-crear-orden-distribucion',  
  templateUrl: './crear-orden-distribucion.component.html',
  styleUrls: ['./crear-orden-distribucion.component.scss']
})

export class CrearOrdenDistribucionComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['select', 'CodigoArticulo', 'Comprobante', 'Fecha-Entrega', 'Cliente', 'Localidad', 'Dir. de entrega'];
  dataSource = ELEMENT_DATA;  
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);
  mostrarFecha = false;
  mostrarTipo = false;
  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'idDetalle';
  order: string = 'asc';


  minDateDesdeFiltro: Date;
  maxDateDesdeFiltro: Date;

  minDateHastaFiltro: Date;
  maxDateHastaFiltro: Date;

  mensaje: string;

  /*
  Filtros
   */
  filtroTipos: any;
  selectedTipo: any = 1;
  
  filtroDarsena: any;
  selectedDarsena: any = 1;

  pickerFiltroDesde:any = null;
  pickerFiltroHasta:any = null;

  body: BodyDetalle ={
    idTipo    : null,
    idDarsena : null,
    desdePedido     : null,
    hastaPedido     : null
  };

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _crearOrdenDistribucionService: CrearOrdenDistribucionService,
              private _dialog: MatDialog) { 

    const currentYear = new Date().getFullYear();
    this.minDateDesdeFiltro = new Date(currentYear - 5, 0, 1);
    this.maxDateDesdeFiltro = new Date(currentYear + 1, 11, 31);
    this.minDateHastaFiltro = new Date(currentYear - 5, 0, 1);
    this.maxDateHastaFiltro = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    
    // this.resetFiltros();    

    this.getfiltros();
    
    this.getDetalle(this.busqueda, this.columna, this.order);
  }

  resetFiltros(){

    this.busqueda = ""
    this.columna = 'idDetalle';
    this.order = 'asc';

    this.busqueda = "";
    this.selectedTipo = 1;
    this.selectedDarsena = 1;
    this.pickerFiltroDesde= null;
    this.pickerFiltroHasta= null;
    this.buscarCbteInput.nativeElement.value = '';
  }

  getfiltros(){

    this._crearOrdenDistribucionService.getAllTipos().subscribe(params => {
      this.filtroTipos = params.datos;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        let errStatus = err.status
        if (errStatus == 0){
          let titulo = 'Error de Servidor';
          let mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })
    
    this._crearOrdenDistribucionService.getAllDarsena().subscribe(params => {
      this.filtroDarsena = params.datos;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        let errStatus = err.status
        if (errStatus == 0){
          let titulo = 'Error de Servidor';
          let mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })


  }

  getDetalle(busqueda, columna, order){
    let idTipo      :number =null;
    let idDarsena   :number =null;
    let desde       :string =null;
    let hasta       :string =null;

    if (this.selectedTipo > 0 )
      idTipo = this.selectedTipo;
  
    if (this.selectedDarsena > 0 )
      idDarsena = this.selectedDarsena;
    
    if (this.pickerFiltroDesde)
      desde = this.pickerFiltroDesde;
    
    if (this.pickerFiltroHasta)
      hasta = this.pickerFiltroHasta;

    this.body.idTipo      = idTipo;
    this.body.idDarsena   = idDarsena;   
    this.body.desdePedido = desde;
    this.body.hastaPedido = hasta;
    
    console.log(this.body);

    this._crearOrdenDistribucionService.getPedidoDetalle(this.body, busqueda, columna, order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        // console.log(this.dataSource2);
        this.length = data.totalRegistros;
      },
      (err: HttpErrorResponse) => {
        this.length = 0;
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al listar';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
          }
        }
      }
    );
  }

  mostrarError(errStatus, titulo, mensaje){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });

    dialogRef.afterClosed()
      .subscribe( () => {
          if (errStatus != 0) {

            this.resetFiltros();
            this.getfiltros();
            this.getDetalle(this.busqueda, this.columna, this.order);
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    this.getDetalle(this.busqueda, this.columna, this.order);
  }

  selectDarsena(event: Event) {
    this.selectedDarsena = (event.target as HTMLSelectElement).value;
    console.log(this.selectedDarsena);
    this.getDetalle(this.busqueda, this.columna, this.order);
  }

  addEvent( tipo, evento ) {

    if (evento.value) {
      let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;
  
      switch (tipo) {
        case "pickerDesde":
          this.pickerFiltroDesde = fecha;
          this.minDateHastaFiltro = evento.value;
          break;
        case "pickerHasta":
          this.pickerFiltroHasta = fecha;
          this.maxDateDesdeFiltro = evento.value;
          break;
      }
    } else {
      
      const currentYear = new Date().getFullYear();

      switch (tipo) {
        case "pickerDesde":
          this.pickerFiltroDesde = null;
          this.minDateHastaFiltro = new Date(currentYear - 5, 0, 1);
          break;
        case "pickerHasta":
          this.pickerFiltroHasta = null;
          this.maxDateDesdeFiltro = new Date(currentYear + 1, 11, 31);
          break;
      }
    }


    this.getDetalle(this.busqueda, this.columna, this.order);

  }

  buscar(){
    this.getDetalle(this.busqueda,this.columna, this.order);
  }

  @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;

    this.page = 0;
    this.columna = 'id';

    this.getDetalle(this.busqueda, this.columna, this.order);

  }

  remitir() {

    localStorage.setItem('Remitir',JSON.stringify(this.selection));
    
    let ruta = `apps/remitos/remitos-conf`;
    this._router.navigate([ruta]);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Articulos): string {
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

  sortData( event ) {
      
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.getDetalle(this.busqueda, this.columna, this.order);
  }

  activarFecha(){
    this.mostrarFecha = !this.mostrarFecha;
  }

  activarTipo(){
    this.mostrarTipo = !this.mostrarTipo;
  }
}

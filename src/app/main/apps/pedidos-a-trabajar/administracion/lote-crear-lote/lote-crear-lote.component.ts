import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';
import { LoteCrearLoteService } from './lote-crear-lote.service';

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
  idTurno : number;
  idOrigen : number;
  idEstado : number;
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  lote : string;
  desdeLote : string;
  hastaLote : string;
}

const ELEMENT_DATA: Articulos[] = [
  {Id: 1,Tipo: "Venta", CodigoArticulo: "ATCLLED110", Nombre: "TCL LED 50\" P8M SMART",    Comprobante: "B0001700006163",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 2,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Pinamar",    Estado: "INICIAL",       Etapa: "INICIAL",    Lote: 0},
  {Id: 3,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Minamar",    Estado: "EN PROCESO",    Etapa: "EN LOTE",    Lote: 4},
  {Id: 4,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "EN PROCESO",    Etapa: "ESTANTERIA", Lote: 3},
  {Id: 5,Tipo: "Venta", CodigoArticulo: "MPLAPLA010", Nombre: "Mueble Madera 1 puerta",    Comprobante: "B0009000012349",    FechaEntrega: "10/05/2020",    Prov: "Bs.As.",    Loc: "Gesell",     Estado: "ANULADO",       Etapa: "SIN STOCK",  Lote: 0},
];

@Component({  
  selector: 'lote-crear-lote',  
  templateUrl: './lote-crear-lote.component.html',
  styleUrls: ['./lote-crear-lote.component.scss']
})

export class LoteCrearLoteComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['select', 'Tipo', 'CodigoArticulo','NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'Provincia', 'Localidad','Etapa', 'Borrar'];
  dataSource = ELEMENT_DATA;  
  dataSource2: any;
  selection = new SelectionModel<Articulos>(true, []);

  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'codigoArticulo';
  order: string = 'asc';


  minDateDesdeFiltro: Date;
  maxDateDesdeFiltro: Date;

  minDateHastaFiltro: Date;
  maxDateHastaFiltro: Date;

  minDateDesdeLote: Date;
  maxDateDesdeLote: Date;

  minDateHastaLote: Date;
  maxDateHastaLote: Date;


  /*
  Filtros
   */
  filtroTipos: any;
  selectedTipo: any = 0;
  
  filtroTurnos: any;
  selectedTurno: any = 0;
  
  filtroOrigenes: any;
  selectedOrigen: any = 0;

  filtroEstados: any;
  selectedEstado: any = 0;

  filtroEtapas: any;
  selectedEtapa: any = 1;

  filtroProvincias: any;
  selectedProvincia: any = 1;

  filtroLocalidades: any;
  selectedLocalidad: any = 1402;

  pickerFiltroDesde:any = null;
  pickerFiltroHasta:any = null;
  pickerLoteDesde:any   = null;
  pickerLoteHasta:any   = null;

  body: BodyDetalle ={
    idTipo      : null,
    idTurno     : null,
    idOrigen    : null,
    idEstado    : null,
    idEtapa     : null,
    idProvincia : null,
    idLocalidad : null,
    desdePedido : null,
    hastaPedido : null,
    lote        : null,
    desdeLote   : null,
    hastaLote   : null
  };

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _loteCrearLoteService: LoteCrearLoteService,
              private _dialog: MatDialog) { 

    const currentYear = new Date().getFullYear();
    this.minDateDesdeFiltro = new Date(currentYear - 5, 0, 1);
    this.maxDateDesdeFiltro = new Date(currentYear + 1, 11, 31);
    this.minDateHastaFiltro = new Date(currentYear - 5, 0, 1);
    this.maxDateHastaFiltro = new Date(currentYear + 1, 11, 31);
    this.minDateDesdeLote   = new Date(currentYear - 5, 0, 1);
    this.maxDateDesdeLote   = new Date(currentYear + 1, 11, 31);
    this.minDateHastaLote   = new Date(currentYear - 5, 0, 1);
    this.maxDateHastaLote   = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    
    // this.resetFiltros();    

    this.getfiltros();
    
    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  resetFiltros(){

    this.busqueda = ""
    this.page = 0;
    this.size = 10;
    this.columna = 'codigoArticulo';
    this.order = 'asc';

    this.busqueda = "";
    this.selectedTipo = 0;
    this.selectedTurno = 0;
    this.selectedOrigen = 0;
    this.selectedEstado = 0;
    this.selectedEtapa = 0;
    this.selectedProvincia = 1;
    this.selectedLocalidad = 1402;
    this.pickerFiltroDesde= null;
    this.pickerFiltroHasta= null;
    this.pickerLoteDesde  = null;
    this.pickerLoteHasta  = null;
    this.lote = null;
    this.buscarCbteInput.nativeElement.value = '';
    this.buscarLoteInput.nativeElement.value = '';
  }

  getfiltros(){
    this._loteCrearLoteService.getAllTipos().subscribe(params => {
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
    
    this._loteCrearLoteService.getAllTurnos().subscribe(params => {
      this.filtroTurnos = params.datos;
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
    
    this._loteCrearLoteService.getAllOrigenes().subscribe(params => {
      this.filtroOrigenes = params.datos;
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

    this._loteCrearLoteService.getAllEstados().subscribe(params => {
      this.filtroEstados = params.datos;
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

    this._loteCrearLoteService.getAllEtapas().subscribe(params => {
      this.filtroEtapas = params.datos;
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

    this._loteCrearLoteService.getAllProvincias().subscribe(params => {
      this.filtroProvincias = params.datos;
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

    this._loteCrearLoteService.getAllLocalidades().subscribe(params => {
      this.filtroLocalidades = params.datos;
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

  getDetalle(busqueda, page, size, columna, order){
    let idTipo      :number =null;
    let idTurno     :number =null;
    let idOrigen    :number =null;
    let idEstado    :number =null;
    let idEtapa     :number =null;
    let idProvincia :number =null;
    let idLocalidad :number =null;
    let desdePedido :string =null;
    let hastaPedido :string =null;
    let lote        :string =null;
    let desdeLote   :string =null;
    let hastaLote   :string =null;

    if (this.selectedTipo > 0 )
      idTipo = this.selectedTipo;
    
    if (this.selectedTurno > 0 )
      idTurno = this.selectedTurno;
    
    if (this.selectedOrigen > 0 )
      idOrigen = this.selectedOrigen;
    
    if (this.selectedEstado > 0 )
      idEstado = this.selectedEstado;
    
    if (this.selectedEtapa > 0 )
      idEtapa = this.selectedEtapa;
    
    if (this.selectedProvincia > 0 )
      idProvincia = this.selectedProvincia;
    
    if (this.selectedLocalidad > 0 )
      idLocalidad = this.selectedLocalidad;
    
    if (this.pickerFiltroDesde)
      desdePedido = this.pickerFiltroDesde;
    
    if (this.pickerFiltroHasta)
      hastaPedido = this.pickerFiltroHasta;
    
    if (this.lote !== null)
      lote = this.lote;
    
    if (this.pickerLoteDesde)
      desdeLote = this.pickerLoteDesde;	
    
    if (this.pickerLoteHasta)
      hastaLote = this.pickerLoteHasta;

    this.body.idTipo      = idTipo;
    this.body.idTurno     = idTurno;
    this.body.idOrigen    = idOrigen;
    this.body.idEstado    = idEstado;
    this.body.idEtapa     = idEtapa;
    this.body.idProvincia = idProvincia;
    this.body.idLocalidad = idLocalidad;
    this.body.desdePedido = desdePedido;
    this.body.hastaPedido = hastaPedido;
    this.body.lote        = lote;
    this.body.desdeLote   = desdeLote;
    this.body.hastaLote   = hastaLote;
    
    // console.log(this.body);

    this._loteCrearLoteService.getPedidoDetalle(this.body, busqueda, page, size, columna, order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        // console.log(this.dataSource2);
        this.length = data.totalRegistros;
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
            let titulo = 'Error al listar';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
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
            this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }
  
  selectTurno(event: Event) {
    this.selectedTurno = (event.target as HTMLSelectElement).value;
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }
  
  selectOrigen(event: Event) {
    this.selectedOrigen = (event.target as HTMLSelectElement).value;
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }
  
  selectEstado(event: Event) {
    this.selectedEstado = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Estado
      //console.log("Buscar Estado");
    }
    console.log("Estado: "+this.selectedEstado);
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  selectEtapa(event: Event) {
    this.selectedEtapa = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Etapa
      console.log("Buscar Etapa");
    } else {

    }
    console.log("Etapa: "+this.selectedEtapa);
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  selectProvincia(event: Event) {
    this.selectedProvincia = (event.target as HTMLSelectElement).value;
    if(this.selectedProvincia > 0){
      this.selectedLocalidad = 0;
      this._loteCrearLoteService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
        this.filtroLocalidades = params.datos;
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
    } else {
      this.selectedLocalidad = 0;
      this._loteCrearLoteService.getAllLocalidades().subscribe(params => {
        this.filtroLocalidades = params.datos;
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
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  selectLocalidad(event: Event) {
    this.selectedLocalidad = (event.target as HTMLSelectElement).value;
    if(this.selectedLocalidad > 0){
      this._loteCrearLoteService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
        this.selectedProvincia = params.id;
        console.log("Provincia: "+this.selectedProvincia);
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
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

  //   console.log(event.value);
  // }

  addEvent( tipo, evento ) {

    console.log("evento value");
    console.log(evento.value);
    console.log("evento value");

    if (evento.value) {
      console.log("tipo "+ tipo +": "+evento.value._i.year+"-"+evento.value._i.month+"-"+evento.value._i.date);
      let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;
  
      switch (tipo) {
        case "pickerFiltroDesde":
          this.pickerFiltroDesde = fecha;
          this.minDateHastaFiltro = evento.value;
          break;
        case "pickerFiltroHasta":
          this.pickerFiltroHasta = fecha;
          this.maxDateDesdeFiltro = evento.value;
          break;
        case "pickerLoteDesde":
          this.pickerLoteDesde = fecha;
          this.minDateHastaLote = evento.value;
          break;
        case "pickerLoteHasta":
          this.pickerLoteHasta = fecha;
          this.maxDateDesdeLote = evento.value;
          break;
      }
    } else {
      
      const currentYear = new Date().getFullYear();

      switch (tipo) {
        case "pickerFiltroDesde":
          this.pickerFiltroDesde = null;
          this.minDateHastaFiltro = new Date(currentYear - 5, 0, 1);
          break;
        case "pickerFiltroHasta":
          this.pickerFiltroHasta = null;
          this.maxDateDesdeFiltro = new Date(currentYear + 1, 11, 31);
          break;
        case "pickerLoteDesde":
          this.pickerLoteDesde = null;
          this.minDateHastaLote = new Date(currentYear - 5, 0, 1);
          break;
        case "pickerLoteHasta":
          this.pickerLoteHasta = null;
          this.maxDateDesdeLote = new Date(currentYear + 1, 11, 31);
          break;
      }
    }


    console.log("pickerFiltroDesde: "+this.pickerFiltroDesde);
    console.log("pickerFiltroHasta: "+this.pickerFiltroHasta);
    console.log("pickerLoteDesde: "+this.pickerLoteDesde);
    console.log("pickerLoteHasta: "+this.pickerLoteHasta);

  }

  buscar(){
    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;

    this.page = 0;
    this.columna = 'id';

    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);

  }

  @Debounce(1000)  
  searchLote() {

    this.lote = this.buscarLoteInput.nativeElement.value;
    if(this.lote === '')
      this.lote =null;
    this.page = 0;
    this.columna = 'id';

    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);

  }

  anular(id){
    let ruta = `apps/pedidos/administracion/anular/${id}`;
    console.log(ruta);
    this._router.navigate([ruta]);
  }

  crearLote() {

    console.log(this.selection);

    localStorage.setItem('Lote',JSON.stringify(this.selection));
    
    let ruta = `apps/pedidos/administracion/addLote`;
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
    
    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }


  paginar(e: any){
      this.page = e.pageIndex;
      this.size = e.pageSize;
      
      this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }
}

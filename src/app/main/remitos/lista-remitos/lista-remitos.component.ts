import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { ListaRemitosService } from './lista-remitos.service';

interface Estados{
  valor: number;
  vista: string;
}
@Component({  
  selector: 'app-lista-remitos',  
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.scss']
})


export class ListaRemitosComponent implements OnInit {

  @ViewChild('buscarRemito') buscarRemitoInput: ElementRef;

  displayedColumns: string[] = ['id', 'nroComprobante', 'fechaAlta', 'direccion', 'transporte', 'cantArticulos', 'info', 'accion'];
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);

  busqueda: string = null;
  idEstado: number = 7;

  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'nroCbte';
  order: string = 'asc';

  filtroFechas: boolean = false;

  pickerRemitoDesde: any   = null;
  pickerRemitoHasta: any   = null;

  minDateDesdeRemito: Date;
  maxDateDesdeRemito: Date;

  minDateHastaRemito: Date;
  maxDateHastaRemito: Date;

  estados: Estados [] = [
    { valor: 1, vista: "Nuevos" },
    { valor: 9, vista: "Orden" },
    { valor: 4, vista: "Transporte" },
    { valor: 2, vista: "Anulados" },
    { valor: null, vista: "Todos" }
  ];

  //ACTIVO ( 7 ) - INACTIVO ( 8 ) - ANULADO ( 2 )

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _listaRemitosService: ListaRemitosService,
              private _dialog: MatDialog,
              ) {  }

  ngOnInit(): void {

    this.getAllRemitosConFiltros();
  }

  //@Debounce(50)  
  searchRemito() {  
    this.busqueda = this.buscarRemitoInput.nativeElement.value;
    if(this.busqueda === '' || this.busqueda === null ){
      this.busqueda = null;
      this.getAllRemitosConFiltros( );
    }
  }
  
  getAllRemitosConFiltros( ) {
    this.columna = 'id';
    this.order = 'desc';

    let body = {
      "nroCbte"      : this.busqueda,
      "fechaDesde"   : this.pickerRemitoDesde,
      "fechaHasta"   : this.pickerRemitoHasta,
      "idEstado"     : this.idEstado
    }
    console.log({body});
    this._listaRemitosService.getAllRemitosConFiltros( body, this.page, this.size, this.columna, this.order ) .subscribe( data => {
      console.log(data);
      console.log(data.totalRegistros);
      this.dataSource2 = data.datos;
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
    });
  }
  
  cambiarEstado( numEstado: number){

    this.idEstado = numEstado;
    console.log( numEstado );
    /* if(estado === "ACTIVO"){
      this.getAllRemitosConFiltros();
    }
    if(estado === "TODOS"){
      this._listaRemitosService.getAllRemitos( this.page, this.size, this.columna, this.order ) .subscribe( data => {
        console.log(data);
        console.log(data.totalRegistros);
        this.dataSource2 = data.datos;
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
      });
    } */
  }

  getRemitoPorComprobante(){
    let resultado: any = [];
    console.log( "busqueda", this.busqueda );
    this._listaRemitosService.getRemitoPorComprobante( this.busqueda, this.page, this.size, this.columna, this.order ).subscribe( data => {
      
      console.log( "data", data );
      /* 
      ANTES
      resultado.push( data );
      console.log( resultado );
      this.dataSource2 = resultado; 
      */
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        let errStatus = err.status;
        if (errStatus == 0){
          let titulo = 'Error de Servidor';
          let mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          let titulo = 'No encontrado';
          let mensaje = "El remito no existe";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  verRemito( remito ){ //redireccionar 
    if( remito != null ){
      let idRemito = remito.id;
      let ruta = `remitos/ver-remito/${ idRemito }`;
      this._router.navigate([ ruta ]);
    }
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

          } else {
            this._router.navigate(['']);
          }
      });
  }

  crearRemito() {
    console.log(this.selection);
    localStorage.setItem('Remito',JSON.stringify(this.selection));
    let ruta = `remitos/crear-remito`;
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
    
    this.getAllRemitosConFiltros( );
  }

  paginar(e: any){
    console.log(e);
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.getAllRemitosConFiltros( ); 
  }

  activarFechas(){
    this.filtroFechas = !this.filtroFechas;
  }

  addEvent( tipo, evento ) {

    // console.log("evento value");
    // console.log(evento.value);
    // console.log("evento value");

    if (evento.value) {
      let mes: string;
      let dia: string;
      if (evento.value._i.month < 10 && evento.value._i.month > 0 ){
        mes = "0"+ (evento.value._i.month + 1 );
      }
      else {
        mes = evento.value._i.month + 1;
      }
      if (evento.value._i.date < 10 && evento.value._i.date > 0 ){
        dia = "0" + evento.value._i.date;
      }
      else {
        dia = evento.value._i.date;
      }
      let fecha = evento.value._i.year+"-"+ mes +"-"+dia;
      console.log("tipo "+ tipo + ": " +fecha);
  
      switch (tipo) {
        case "pickerRemitoDesde":
          this.pickerRemitoDesde = fecha;
          this.minDateHastaRemito = evento.value;
          break;
        case "pickerRemitoHasta":
          this.pickerRemitoHasta = fecha;
          this.maxDateDesdeRemito = evento.value;
          console.log(this.pickerRemitoHasta);
          break;
      }
          
    } else {
      const currentYear = new Date().getFullYear();

      switch (tipo) {
        case "pickerRemitoDesde":
          this.pickerRemitoDesde = null;
          this.minDateHastaRemito= new Date(currentYear - 5, 0, 1);
          break;
        case "pickerRemitoHasta":
          this.pickerRemitoHasta = null;
          this.maxDateDesdeRemito = new Date(currentYear + 1, 11, 31);
          break;
      }
    }

  }
}

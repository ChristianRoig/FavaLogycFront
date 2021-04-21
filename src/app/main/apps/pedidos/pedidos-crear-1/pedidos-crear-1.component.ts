import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';

//components
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { PedidosListaService } from '../pedidos-lista/pedidos-lista.service';
import { PedidosCrear1Service } from './pedidos-crear-1.service';

@Component({
  selector: 'app-pedidos-crear-1',
  templateUrl: './pedidos-crear-1.component.html',
  styleUrls: ['./pedidos-crear-1.component.scss']
})

export class PedidosCrear1Component implements OnInit {

  @ViewChild('buscarPuntoVenta') buscarPuntoVenta: ElementRef;
  @ViewChild('buscarCbte') buscarCbte: ElementRef;


  subParametros: Subscription;
  
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre','codigoDeBarras'];

  dataSourceArticulos: any;
  cabecera: any;
  picker: any;
  selection = new SelectionModel<any>(true, []);

  filtroTipos: any;
  selectedTipo: any = 1;

  puntoVenta: string = "B00088";
  cbte: string = "00024195";

  mostrarArticulos: boolean = false;

  constructor(private _router: Router,
              private _service: PedidosCrear1Service, 
              private _pedidosListaService: PedidosListaService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.getfiltros();

  }

  buscar(){
    let comprobante = this.puntoVenta+this.cbte
    this._service.getDetalle(this.selectedTipo, comprobante).subscribe(params => {
      console.log(params);
      this.dataSourceArticulos = params.datos;
      this.mostrarArticulos = true;
    },
    (err: HttpErrorResponse) => {
      this.mostrarArticulos = false;
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

  agregar(){
    console.log("this.selection", this.selection);
    console.log("this.selectedTipo", this.selectedTipo);
    localStorage.setItem('AddPedido',JSON.stringify( this.selection ));
    localStorage.setItem('IdTipo',JSON.stringify( this.selectedTipo ));
    
    let ruta = `apps/pedidos/crear-pedido2/0`;

    this._router.navigate([ruta]);
  }
  
  searchCbte() {

    this.cbte = this.buscarCbte.nativeElement.value;
    if (this.cbte.length > 0){
      let cantCaracteres = 8;
      //this.cbte = this.adaptarValorDeBusqueda(this.cbte, cantCaracteres);
      this.cbte = this.adaptar(this.cbte, cantCaracteres);
      console.log("this.cbte", this.cbte);
    }
  }
  
  searchPuntoVenta() {
    this.puntoVenta = this.buscarPuntoVenta.nativeElement.value;
    if(this.puntoVenta.length > 0){
      let cantCaracteres = 6;
      this.puntoVenta = this.adaptar( this.puntoVenta, cantCaracteres);
    }
  }

  adaptar(palabra: string, cantCaracteres: number){
    if(palabra.length < cantCaracteres){
      if(cantCaracteres == 8){
        while(palabra.length < 8){
          palabra = "0"+palabra;
        }
        console.log("palabra", palabra);
        return palabra;
      }
      if(cantCaracteres == 6){
        let palabraFinal = palabra.charAt(0);
        console.log("asd", palabraFinal);
        palabra = palabra.substring(1);//saco el primer caracter de la cadena
        console.log("la puta palabra cortada", palabra);
        while(palabra.length < 5){
          palabra = "0" + palabra;
        }
        palabraFinal += palabra;
        console.log("palabraFinal", palabraFinal);
        return palabraFinal; 
      }
    }
  }

  /* adaptarValorDeBusqueda(palabra: string, cantCaracteres: number){
    let newStr: string = "";
    //console.log("palabra.length", palabra.length);
    if(palabra.length <= cantCaracteres){     //si tiene menor de 6 caracteres
        for (let i = 0; i <= palabra.length; i++) {
            if(palabra.charAt(i) !== "0"){      //mientras que el char sea distinto de 0
                newStr += palabra.charAt(i);    //guardo el valor el la variable
            }
        }
      //console.log("newString",newStr);
      let num = cantCaracteres - newStr.length;
      let h = 0;
      let stringRetorno = "";
      if(cantCaracteres == 6){
        stringRetorno = newStr.charAt(0);
        h =1 ;
      }
      for(let i = 0; i < num; i++){
          stringRetorno += "0";
      }
      for( h; h <= newStr.length; h++){
          stringRetorno += newStr.charAt(h);
      }
      stringRetorno = stringRetorno.toLocaleUpperCase();
      //console.log("stringRetorno", stringRetorno);

      return stringRetorno;
    }
  } */

  getfiltros(){
    this._pedidosListaService.getAllTipos().subscribe(params => {
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
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    console.log(this.selectedTipo);
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

  addEvent( evento ) {
    if (evento.value) {
      let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;
      this.picker = fecha;
    } else {
      this.picker = null;
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceArticulos.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceArticulos.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  volver(){
    let ruta = `apps/pedidos/pedidos-lista`;
    this._router.navigate([ruta]);
  }

}

import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ControlEstanteriaService } from './control-estanteria.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BuscarLoteComponent } from '../lote-administrar-lote/buscar-lote/buscar-lote.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  idLote : number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];

@Component({  
  selector: 'app-control-estanteria',  
  templateUrl: './control-estanteria.component.html',
  styleUrls: ['./control-estanteria.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ControlEstanteriaComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;
  @ViewChild('buscarCUPA') buscarCUPAInput: ElementRef;
  @ViewChild('buscarCodigoBarras') buscarCodigoBarrasInput: ElementRef;

  // displayedColumns: string[] = ['select', 'Tipo', 'CodigoArticulo','NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'Provincia', 'Localidad','Etapa', 'Lote', 'Borrar'];
  displayedColumns: string[] = ['select', 'CodigoArticulo','NombreArticulo', 'Etapa', 'Comprobante'];
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null; 
  
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);

  idLote: number = null;
  lote: string = null;
  codigoBarras: string = null;
  CUPA: string = null;
  nombreLote: string = '';
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
  selectedEtapa: any = 0;

  filtroProvincias: any;
  selectedProvincia: any = 0;

  filtroLocalidades: any;
  selectedLocalidad: any = 0;

  pickerFiltroDesde:any = null;
  pickerFiltroHasta:any = null;
  pickerLoteDesde:any   = null;
  pickerLoteHasta:any   = null;

  body: BodyDetalle ={
    idTipo      : null,
    idTurno     : null,
    idOrigen    : null,
    idEtapa     : null,
    idProvincia : null,
    idLocalidad : null,
    desdePedido : null,
    hastaPedido : null,
    idLote        : null
  };

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _loteAdministrarLoteService: ControlEstanteriaService,
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
    
    // this.getfiltros();
    
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  buscarLote() {
    
    let dialogRef = this._dialog.open(BuscarLoteComponent, {
      data: {
        lote:       this.lote,
        fechaDesde: this.pickerLoteDesde,
        fechaHasta: this.pickerLoteHasta
      } 
    });
    
    dialogRef.afterClosed()
      .subscribe(result => {
        if(localStorage.getItem('Lote')){
          this.nombreLote = JSON.parse(localStorage.getItem('Lote')).nombre;
          this.idLote     = JSON.parse(localStorage.getItem('Lote')).id;
          localStorage.removeItem('Lote');
          this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
        }
      });
  }

  sacarDelLote(){
    let listaIdPedidoDetalle: Array<number> = new Array<number>();

    
    for (let entry of this.selection.selected) {
      listaIdPedidoDetalle.push(entry.id);
    }
    console.log(listaIdPedidoDetalle)
    
    this._loteAdministrarLoteService.postEliminarArticuloDeLote(listaIdPedidoDetalle).subscribe(params => {
      console.log("termino Ok");
      this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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

  resetFiltros(){

    this.busqueda = ""
    this.page = 0;
    this.size = 10;
    this.columna = 'idDetalle';
    this.order = 'asc';

    this.busqueda = "";
    this.selectedTipo = 0;
    this.selectedTurno = 0;
    this.selectedOrigen = 0;
    this.selectedEtapa = 0;
    this.selectedProvincia = 1;
    this.selectedLocalidad = 1402;
    this.pickerFiltroDesde= null;
    this.pickerFiltroHasta= null;
    // this.pickerLoteDesde  = null;
    // this.pickerLoteHasta  = null;
    // this.lote = null;
    
    // this.buscarLoteInput.nativeElement.value = '';
    this.buscarCbteInput.nativeElement.value = '';
  }

  getfiltros(){
    this._loteAdministrarLoteService.getAllTipos().subscribe(params => {
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
    
    this._loteAdministrarLoteService.getAllTurnos().subscribe(params => {
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
    
    this._loteAdministrarLoteService.getAllOrigenes().subscribe(params => {
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

    this._loteAdministrarLoteService.getAllEtapas().subscribe(params => {
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

    this._loteAdministrarLoteService.getAllProvincias().subscribe(params => {
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

    this._loteAdministrarLoteService.getAllLocalidades().subscribe(params => {
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
    let idLote      :number =null;
    let desdeLote   :string =null;
    let hastaLote   :string =null;
    this.selection.clear();

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
    
    if (this.idLote !== null)
      idLote = this.idLote;
    
    if (this.pickerLoteDesde)
      desdeLote = this.pickerLoteDesde;	
    
    if (this.pickerLoteHasta)
      hastaLote = this.pickerLoteHasta;

    this.body.idTipo      = idTipo;
    this.body.idTurno     = idTurno;
    this.body.idOrigen    = idOrigen;
    this.body.idEtapa     = idEtapa;
    this.body.idProvincia = idProvincia;
    this.body.idLocalidad = idLocalidad;
    this.body.desdePedido = desdePedido;
    this.body.hastaPedido = hastaPedido;
    this.body.idLote      = idLote;
    
    // console.log(this.body);

    this._loteAdministrarLoteService.getPedidosLote(this.body, busqueda, columna, order).subscribe(
      data => {
        // console.log(data)
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        this.buscarCodigoBarrasInput.nativeElement.focus();
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
            // this.getfiltros();
            // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
            
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
      this._loteAdministrarLoteService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
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
      this._loteAdministrarLoteService.getAllLocalidades().subscribe(params => {
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
      this._loteAdministrarLoteService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
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

    // console.log("evento value");
    // console.log(evento.value);
    // console.log("evento value");

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


    // console.log("pickerFiltroDesde: "+this.pickerFiltroDesde);
    // console.log("pickerFiltroHasta: "+this.pickerFiltroHasta);
    // console.log("pickerLoteDesde: "+this.pickerLoteDesde);
    // console.log("pickerLoteHasta: "+this.pickerLoteHasta);

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

  searchLote() {

    this.lote = this.buscarLoteInput.nativeElement.value;
    if(this.lote === '')
      this.lote =null;

  }

  @Debounce(1000) 
  searchCodigoBarras() {

    this.codigoBarras = this.buscarCodigoBarrasInput.nativeElement.value;
    if(this.lote !== ''){
      this.buscarCUPAInput.nativeElement.focus();
    }

  }

  @Debounce(1000) 
  searchCUPA() {

    this.CUPA = this.buscarCUPAInput.nativeElement.value;
    if(this.lote !== ''){
      this.resetCampos();
      this.buscarCodigoBarrasInput.nativeElement.focus();
    }

  }

  @Debounce(1000) 
  resetCampos(){
    this.buscarCodigoBarrasInput.nativeElement.clear();
    this.buscarCUPAInput.nativeElement.clear();
    this.codigoBarras = '';
    this.CUPA = '';
  }

  consultar(id){
    let ruta = `apps/pedidos/administracion/visualizacion/${id}`;
    this._router.navigate([ruta]);
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
}

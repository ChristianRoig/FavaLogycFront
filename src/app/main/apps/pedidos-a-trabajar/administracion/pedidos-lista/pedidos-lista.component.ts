import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PedidosListaService } from './pedidos-lista.service';

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
  idLote : number;
  desdeLote : string;
  hastaLote : string;
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
  dataSource2: any;
  selection = new SelectionModel<PeriodicElement>(true, []);


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
    idLote      : null,
    desdeLote   : null,
    hastaLote   : null
  };

  constructor(private _router: Router, private _fuseSidebarService: FuseSidebarService, private _pedidosListaService: PedidosListaService) { }

  ngOnInit(): void {
    
    this._pedidosListaService.getAllTipos().subscribe(params => {
      this.filtroTipos = params.datos;
    })
    
    this._pedidosListaService.getAllTurnos().subscribe(params => {
      this.filtroTurnos = params.datos;
    })
    
    this._pedidosListaService.getAllOrigenes().subscribe(params => {
      this.filtroOrigenes = params.datos;
    })

    this._pedidosListaService.getAllEstados().subscribe(params => {
      this.filtroEstados = params.datos;
    })

    this._pedidosListaService.getAllEtapas().subscribe(params => {
      this.filtroEtapas = params.datos;
    })

    this._pedidosListaService.getAllProvincias().subscribe(params => {
      this.filtroProvincias = params.datos;

    })

    // this._pedidosListaService.getAllLocalidades().subscribe(params => {
    //   this.filtroLocalidades = params.datos;
    // })
    
    this.getDetalle();
  }

  getDetalle(){
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
    
    if (this.pickerFiltroDesde > 0 )
      desdePedido = this.pickerFiltroDesde;
    
    if (this.pickerFiltroHasta > 0 )
      hastaPedido = this.pickerFiltroHasta;
    
    if (this.selectedTipo > 0 )
      idLote = null;
    
    if (this.selectedTipo > 0 )
      desdeLote = null;	
    
    if (this.selectedTipo > 0 )
      hastaLote = null;

    this.body.idTipo      = idTipo;
    this.body.idTurno     = idTurno;
    this.body.idOrigen    = idOrigen;
    this.body.idEstado    = idEstado;
    this.body.idEtapa     = idEtapa;
    this.body.idProvincia = idProvincia;
    this.body.idLocalidad = idLocalidad;
    this.body.desdePedido = desdePedido;
    this.body.hastaPedido = hastaPedido;
    this.body.idLote      = idLote;
    this.body.desdeLote   = desdeLote;
    this.body.hastaLote   = hastaLote;
    
    this._pedidosListaService.getPedidoDetalle(this.body).subscribe(
      data => {
        this.dataSource2 = data.datos;
        console.log(this.dataSource2);
      }
    );
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    this.getDetalle();
  }
  
  selectTurno(event: Event) {
    this.selectedTurno = (event.target as HTMLSelectElement).value;
    this.getDetalle();
  }
  
  selectOrigen(event: Event) {
    this.selectedOrigen = (event.target as HTMLSelectElement).value;
    this.getDetalle();
  }
  
  selectEstado(event: Event) {
    this.selectedEstado = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Estado
      //console.log("Buscar Estado");
    }
    //console.log("Estado: "+this.selectedEstado);
    this.getDetalle();
  }

  selectEtapa(event: Event) {
    this.selectedEtapa = (event.target as HTMLSelectElement).value;
    if(this.selectedEstado !== 0){
      //Buscar Etapa
      //console.log("Buscar Etapa");
    } else {

    }
    this.getDetalle();
  }

  selectProvincia(event: Event) {
    this.selectedProvincia = (event.target as HTMLSelectElement).value;
    this.selectedLocalidad = 0;
    if(this.selectedProvincia > 0){
      
      this._pedidosListaService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
        this.filtroLocalidades = params.datos;
      })
    } else {
      this._pedidosListaService.getAllLocalidades().subscribe(params => {
        this.filtroLocalidades = params.datos;
      })
    }
    this.getDetalle();
  }

  selectLocalidad(event: Event) {
    this.selectedLocalidad = (event.target as HTMLSelectElement).value;
    if(this.selectedLocalidad > 0){
      this._pedidosListaService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
        this.selectedProvincia = params.id;
        // console.log("Provincia: "+this.selectedProvincia);
      })
    }
    this.getDetalle();
  }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

  //   console.log(event.value);
  // }

  addEvent( tipo, evento ) {
    console.log("tipo "+ tipo +": "+evento.value._i.year+"-"+evento.value._i.month+"-"+evento.value._i.date);
    let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;

    switch (tipo) {
      case "pickerFiltroDesde":
        this.pickerFiltroDesde = fecha;
        break;
      case "pickerFiltroHasta":
        this.pickerFiltroHasta = fecha;
        break;
      case "pickerLoteDesde":
        this.pickerLoteDesde = fecha;
        break;
      case "pickerLoteHasta":
        this.pickerLoteHasta = fecha;
        break;
    }

    console.log("pickerFiltroDesde: "+this.pickerFiltroDesde);
    console.log("pickerFiltroHasta: "+this.pickerFiltroHasta);
    console.log("pickerLoteDesde: "+this.pickerLoteDesde);
    console.log("pickerLoteHasta: "+this.pickerLoteHasta);

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

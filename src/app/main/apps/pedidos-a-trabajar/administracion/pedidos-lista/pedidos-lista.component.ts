import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PedidosListaService } from './pedidos-lista.service';
import { Debounce } from 'app/shared/decorators/debounce';

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
  idLote : string;
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

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['select', 'Tipo', 'CodigoArticulo','NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'Provincia', 'Localidad', 'Estado','Etapa', 'Lote', 'Borrar'];
  dataSource = ELEMENT_DATA;  
  dataSource2: any;
  selection = new SelectionModel<PeriodicElement>(true, []);

  lote: string = null;
  busqueda: string;
  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;


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
    
    this.busqueda = ""
    this.page = 0;
    this.size = 10;
    this.columna = 'codigoArticulo';
    this.order = 'asc';

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

    this._pedidosListaService.getAllLocalidades().subscribe(params => {
      this.filtroLocalidades = params.datos;
    })
    
    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  getDetalle(busqueda, page, size, columna, order){
    let idTipo      :number =null;
    let idTurno     :number =null;
    let idOrigen    :number =null;
    let idEstado    :number =null;
    let idEtapa     :number =null;
    let idProvincia :number =null;
    let idLocalidad :number =null;
    let desdePedido :string =this.pickerFiltroDesde;
    let hastaPedido :string =this.pickerFiltroHasta;
    let lote        :string =null;
    let desdeLote   :string =this.pickerLoteDesde;
    let hastaLote   :string =this.pickerLoteHasta;

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
    
    if (this.lote !== null)
      lote = this.lote;
    
    if (this.pickerLoteDesde > 0 )
      desdeLote = this.pickerLoteDesde;	
    
    if (this.pickerLoteHasta > 0 )
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
    this.body.idLote      = lote;
    this.body.desdeLote   = desdeLote;
    this.body.hastaLote   = hastaLote;
    
    this._pedidosListaService.getPedidoDetalle(this.body, busqueda, page, size, columna, order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        console.log(this.dataSource2);
      }
    );
    console.log(this.body);
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
      
      this._pedidosListaService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
        this.filtroLocalidades = params.datos;
      })
    } else {
      this.selectedLocalidad = 0;
      this._pedidosListaService.getAllLocalidades().subscribe(params => {
        this.filtroLocalidades = params.datos;
      })
    }
    console.log("Provincia: "+this.selectedProvincia);
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  selectLocalidad(event: Event) {
    this.selectedLocalidad = (event.target as HTMLSelectElement).value;
    if(this.selectedLocalidad > 0){
      this._pedidosListaService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
        this.selectedProvincia = params.id;
        console.log("Provincia: "+this.selectedProvincia);
      })
    }
    // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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

  consultar(id){
    let ruta = `apps/pedidos/administracion/visualizacion/${id}`;
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

import { Component, Input, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DetallesTablaRetractil } from 'app/interfaces/detalles-tabla-retractil';

@Component({
  selector: 'app-tabla-retractil',
  templateUrl: './tabla-retractil.component.html',
  styleUrls: ['./tabla-retractil.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TablaRetractilComponent implements OnInit {

  @Input('arregloDeDetalles') arregloDeDetalles: Array<any>;

  dataSource;
  //'Check', 
  columnsToDisplay = ['Cod. Art.', 'Nomb. Art.', 'Cant.', 'Etapa', 'CodBarra', 'Cupa'];
  ELEMENT_DATA: DetallesTablaRetractil[] = [];
  columnsToDisplay2 = ['Checks', 'Nomb. de Parte', 'Identificador', 'CUPA'];
  expandedElement: DetallesTablaRetractil | null;

  constructor() { }

  ngOnInit(): void { 

    //console.log("appretractil ", this.arregloDeDetalles);
    this.convertirDatosEnArreglo();
  }

  convertirDatosEnArreglo() {
    for (let index = 0; index < this.arregloDeDetalles.length; index++) {
      const element = this.arregloDeDetalles[index];
      
      let cod_art = element.detalle.articulo.codigoArticulo;
      let check = element.cantidadDeDetalles === element.cantidadDeDetallesCheckeados ? true : false;
      let nom_art = element.detalle.articulo.nombre;
      let etapa = element.detalle.pedidoEtapa.nombre;
      let cant = element.cantidadDeDetallesCheckeados + '/' + element.cantidadDeDetalles;
      let codBarra;
      
      if( element.articuloCodBarras[0] === undefined ){
        codBarra = 0; 
      } else{
        //console.log(element.articuloCodBarras.lenght);
        codBarra = element.articuloCodBarras[0].codigoDeBarras; 
      }
      //let codBarra = 0; 
      let cupa = element.listaPartes[0].codigoUnicoParteArticulo;

      let objeto = {
        'Cod. Art.': cod_art,
        Check: check,
        'Nomb. Art.': nom_art,
        'Cant.': cant,
        Etapa: etapa,
        'CodBarra': codBarra,
        'Cupa': cupa,
        Detalle: []
      }
      for (let index = 0; index < element.listaPartes.length; index++) {
        const elemento = element.listaPartes[index];
        let detalle = {
          Checks: elemento.checkEstanteria,
          Nomb_de_Parte: elemento.pedidoDetalle.articulo.nombre,
          Identificador: elemento.id,
          CUPA: elemento.codigoUnicoParteArticulo
        }
        //console.log( "asd", detalle.Identificador, "|", detalle.CUPA);
        objeto.Detalle.push(detalle);
      }
      this.ELEMENT_DATA.push(objeto);
      //console.log("largo del array", this.ELEMENT_DATA.length);
    }
    this.dataSource = this.ELEMENT_DATA;
  }

}
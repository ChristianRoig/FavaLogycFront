import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plantilla-fondo',
  templateUrl: './plantilla-fondo.component.html',
  styleUrls: ['./plantilla-fondo.component.scss']
})
export class PlantillaFondoComponent implements OnInit {

  @Input('titulo') titulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

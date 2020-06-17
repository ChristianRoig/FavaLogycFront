import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-plantilla-fondo',
  templateUrl: './plantilla-fondo.component.html',
  animations   : fuseAnimations,
})
export class PlantillaFondoComponent implements OnInit {

  @Input('titulo') titulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

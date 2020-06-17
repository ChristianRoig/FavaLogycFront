import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-plantilla-fondo-simple',
  templateUrl: './plantilla-fondo-simple.component.html',
  animations   : fuseAnimations,
})
export class PlantillaFondoSimpleComponent implements OnInit {

  @Input('titulo') titulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plantilla-fondo-simple',
  templateUrl: './plantilla-fondo-simple.component.html',
  styleUrls: ['./plantilla-fondo-simple.component.scss'],
  animations   : fuseAnimations,
})


export class PlantillaFondoSimpleComponent implements OnInit {
  
  @Input('titulo') titulo: string = '';
  @Input('arrowBack') arrowBack: boolean = false;

  
  constructor(private _location : Location) { }
  
  ngOnInit(): void {
    
  }

  back() {
    this._location.back();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plantilla-fondo',
  templateUrl: './plantilla-fondo.component.html',
  animations   : fuseAnimations,
})
export class PlantillaFondoComponent implements OnInit {

  @Input('titulo') titulo: string = '';
  @Input('arrowBack') arrowBack: boolean = false;

  constructor(private _location : Location) { }

  ngOnInit(): void {
  }

  back() {
    this._location.back();
    localStorage.clear();
  }

}

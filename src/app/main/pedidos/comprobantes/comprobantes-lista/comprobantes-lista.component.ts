import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ComprobantesListaService } from './comprobantes-lista.service';


@Component({  
  selector: 'app-comprobantes-lista',  
  templateUrl: './comprobantes-lista.component.html',
  styleUrls: ['./comprobantes-lista.component.scss']
})

export class ComprobantesListaComponent implements OnInit {


  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _comprobantesListaService: ComprobantesListaService,
              private _dialog: MatDialog ) { }

  ngOnInit(): void { 
  
  }



}

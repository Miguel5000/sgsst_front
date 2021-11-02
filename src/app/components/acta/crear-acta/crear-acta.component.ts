import { Component, OnInit } from '@angular/core';
import { Acta } from 'src/app/_model/Acta';
import { ActasService } from 'src/app/_service/actas.service';

@Component({
  selector: 'app-crear-acta',
  templateUrl: './crear-acta.component.html',
  styleUrls: ['./crear-acta.component.css']
})
export class CrearActaComponent implements OnInit {

  constructor(private actasService: ActasService) { 
   
  }

  ngOnInit(): void {


  }

}

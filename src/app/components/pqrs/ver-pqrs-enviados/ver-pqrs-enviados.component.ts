import { Component, OnInit } from '@angular/core';
import { Pqrs } from 'src/app/_model/Pqrs';

@Component({
  selector: 'app-ver-pqrs-enviados',
  templateUrl: './ver-pqrs-enviados.component.html',
  styleUrls: ['./ver-pqrs-enviados.component.css']
})
export class VerPqrsEnviadosComponent implements OnInit {

  pqrs: Pqrs = new Pqrs();

  constructor() { }

  ngOnInit(): void {

    let pqrsJson = sessionStorage.getItem("pqrsVer");

    if(pqrsJson != null){

      this.pqrs = JSON.parse(pqrsJson);
    }

  }

}

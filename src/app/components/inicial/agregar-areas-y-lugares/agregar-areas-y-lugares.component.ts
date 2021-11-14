import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Area } from 'src/app/_model/Area';
import { Empresa } from 'src/app/_model/Empresa';
import { Lugar } from 'src/app/_model/Lugar';
import { AreasService } from 'src/app/_service/areas.service';
import { LugaresService } from 'src/app/_service/lugares.service';

@Component({
  selector: 'app-agregar-areas-y-lugares',
  templateUrl: './agregar-areas-y-lugares.component.html',
  styleUrls: ['./agregar-areas-y-lugares.component.css']
})
export class AgregarAreasYLugaresComponent implements OnInit {

  constructor(private router: Router,
    private lugaresService: LugaresService,
    private areasService: AreasService,
    private snackBar: MatSnackBar) {

    this.agregarForm = this.createFormGroup();

  }

  diferenciacion: string;
  areasInterfaz: AreaInterfaz[] = [];
  lugaresInterfaz: LugarInterfaz[] = [];
  agregarForm: FormGroup;
  empresa: Empresa = new Empresa();
  areasInterfazFiltradas: AreaInterfaz[] = [];
  lugaresInterfazFiltrados: LugarInterfaz[] = [];

  createFormGroup() {

    return new FormGroup({

      lugarOArea: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  getMensajeError() {

    let mensajeError: string[] = [];

    if (this.agregarForm.controls.lugarOArea.hasError('required')) {

      mensajeError.push("Introduzca un valor");

    }

  }

  ngOnInit(): void {

    let empresaJson = sessionStorage.getItem("empresa");
    this.empresa = new Empresa();

    if (empresaJson != null) {
      this.empresa = JSON.parse(empresaJson);
    }

    if (this.router.url.includes("Area")) {

      this.diferenciacion = "área";
      this.actualizarAreas();


    } else {

      this.diferenciacion = "lugar"
      this.actualizarLugares();

    }

  }

  actualizarAreas() {

    this.areasInterfaz = [];

    this.areasService.getAreas(this.empresa).subscribe(data => {

      data.forEach(element => {
        let areaInterfaz: AreaInterfaz = new AreaInterfaz();
        areaInterfaz.id = element.id;
        areaInterfaz.nombre = element.nombre;
        areaInterfaz.editable = false;
        this.areasInterfaz.push(areaInterfaz);
      });

      this.areasInterfazFiltradas = this.areasInterfaz.filter(area => area.nombre.toLowerCase().includes(""));
      
    });

  }

  actualizarLugares() {

    this.lugaresInterfaz = [];

    this.lugaresService.getLugares(this.empresa).subscribe(data => {

      data.forEach(element => {
        let lugarInterfaz: LugarInterfaz = new LugarInterfaz();
        lugarInterfaz.id = element.id;
        lugarInterfaz.nombre = element.nombre;
        lugarInterfaz.editable = false;
        this.lugaresInterfaz.push(lugarInterfaz);
      });

      this.lugaresInterfazFiltrados = this.lugaresInterfaz.filter(lugar => lugar.nombre.toLowerCase().includes(""));
    
    });

  }

  agregar() {

    if (this.agregarForm.valid) {

      if (this.diferenciacion == "área") {

        let areaAgregar: Area = new Area();
        areaAgregar.idEmpresa = this.empresa.id;
        areaAgregar.nombre = this.agregarForm.controls.lugarOArea.value;

        this.areasService.isAgregable(areaAgregar).subscribe(data => {

          if (data) {

            this.areasService.crear(areaAgregar).subscribe(data1 => {

              this.actualizarAreas();
              this.agregarForm.controls.lugarOArea.setValue("");
              this.snackBar.open("Área insertada con éxito", "close", { duration: 3000 });

            });

          } else {

            this.snackBar.open("Ya existe un área con ese nombre en la empresa", "close", { duration: 3000 });

          }

        })

      } else {

        let lugarAgregar: Lugar = new Lugar();
        lugarAgregar.idEmpresa = this.empresa.id;
        lugarAgregar.nombre = this.agregarForm.controls.lugarOArea.value;

        this.lugaresService.isAgregable(lugarAgregar).subscribe(data => {

          if (data) {

            this.lugaresService.crear(lugarAgregar).subscribe(data => {

              this.actualizarLugares();
              this.agregarForm.controls.lugarOArea.setValue("");
              this.snackBar.open("Lugar insertado con éxito", "close", { duration: 3000 });

            });

          } else {

            this.snackBar.open("Ya existe un lugar con ese nombre en la empresa", "close", { duration: 3000 });

          }


        })

      }

    }

  }

  eliminarArea(areaInterfaz: AreaInterfaz) {

    this.areasService.get(areaInterfaz.id).subscribe(data => {

      this.areasService.isEliminable(data).subscribe(data2 => {

        if (data2) {

          this.areasService.eliminar(data).subscribe(data3 => {

            this.snackBar.open("Área eliminada con éxito", "close", { duration: 3000 });
            this.actualizarAreas();

          });

        } else {

          this.snackBar.open("No se puede eliminar el área porque ya hay un usuario asociado a esta", "close", { duration: 3000 });

        }

      })

    })

  }

  hacerLugarEditable(lugarInterfaz: LugarInterfaz) {

    lugarInterfaz.editable = true;

  }

  hacerAreaEditable(areaInterfaz: AreaInterfaz) {

    areaInterfaz.editable = true;

  }

  editarLugar(lugarInterfaz: LugarInterfaz) {

    this.lugaresService.get(lugarInterfaz.id).subscribe(data => {

      let lugarEditar: Lugar = data;
      lugarEditar.nombre = lugarInterfaz.nombre;

      this.lugaresService.editar(lugarEditar).subscribe(data => {

        this.snackBar.open("Lugar editado con éxito", "close", { duration: 3000 });
        this.actualizarLugares();

      })

    })

  }

  editarArea(areaInterfaz: AreaInterfaz) {

    this.areasService.get(areaInterfaz.id).subscribe(data => {

      let areaEditar: Lugar = data;
      areaEditar.nombre = areaInterfaz.nombre;

      this.areasService.editar(areaEditar).subscribe(data => {

        this.snackBar.open("Área editada con éxito", "close", { duration: 3000 });
        this.actualizarAreas();

      })

    })

  }

  eliminarLugar(lugarInterfaz: LugarInterfaz) {

    this.lugaresService.get(lugarInterfaz.id).subscribe(data => {

      this.lugaresService.isEliminable(data).subscribe(data2 => {

        if (data2) {

          this.lugaresService.eliminar(data).subscribe(data3 => {

            this.snackBar.open("Lugar eliminado con éxito", "close", { duration: 3000 });
            this.actualizarLugares();

          });

        } else {

          this.snackBar.open("No se puede eliminar el lugar porque ya hay un acta asociada a este", "close", { duration: 3000 });

        }

      })

    })

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;

    if (this.diferenciacion == "área") {

      this.areasInterfazFiltradas = this.areasInterfaz.filter(area => area.nombre.toLowerCase().includes(elemento.value.toLowerCase()));

    } else {

      this.lugaresInterfazFiltrados = this.lugaresInterfaz.filter(lugar => lugar.nombre.toLowerCase().includes(elemento.value.toLowerCase()));

    }

  }

}

class AreaInterfaz {

  id: number;
  nombre: string;
  editable: boolean;

}

class LugarInterfaz {

  id: number;
  nombre: string;
  editable: boolean;

}
import { AbstractControl } from '@angular/forms';

export class ValidacionesPropias {
  
  static verificacionClave(control: AbstractControl) {
    if (control.parent != undefined) {
      var clave1 = control.parent.controls['contraseña'].value;
      var clave2 = control.value;

      if (clave1 != clave2) {
        return { verificacionClave: true };
      }
    }
    return null;
  }
}

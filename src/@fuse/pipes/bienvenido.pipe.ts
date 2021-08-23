import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bienvenido'
})

export class BienvenidoPipe implements PipeTransform {

  transform(value: string): string {

    let splitted = value.split(".");

    return ("Bienvenido " + splitted[1][0].toUpperCase() + splitted[1].substr(1).toLowerCase() + " !");
  }

}

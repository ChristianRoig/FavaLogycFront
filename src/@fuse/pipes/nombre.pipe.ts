
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre'
})

export class NombrePipe implements PipeTransform {

  transform(value: string): string {
    let splitted;
    if (value != null){

      splitted = value.split(".");
      console.log({splitted});
      if (splitted != " "){
        let name = splitted[1][0].toUpperCase() + splitted[1].substr(1).toLowerCase();
        let surname = splitted[0][0].toUpperCase() + splitted[0].substr(1).toLowerCase();
        return (name + " " + surname);
      } 
    }
  }

}

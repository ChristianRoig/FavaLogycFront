import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guion'
})

// Si es null retorna "-" sino value

export class GuionPipe implements PipeTransform {

  transform(value: any): any {
    if ((value == null || value == "") || value === undefined) {
      return ("-");
    } else {
      return value;
    }

  }

}

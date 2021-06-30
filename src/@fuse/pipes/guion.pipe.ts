import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guion'
})

// Si es null retorna "-" sino value

export class GuionPipe implements PipeTransform {

  transform(value: any): any {
    if (value == null || value == "") {
      return ("-");
    } else {
      return value;
    }

  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from '../../providers/converter';

@Pipe({
  name: 'dateFormatterYMD',
})
export class DateFormatterYMDPipe implements PipeTransform {
  transform(value: string, ...args) {    
    return Converter.toYYYYMMDD(value);
  }
}

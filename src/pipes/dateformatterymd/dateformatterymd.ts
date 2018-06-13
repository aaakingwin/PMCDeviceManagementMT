import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from '../../providers/converter';

@Pipe({
  name: 'dateFormatterYMD',
})
export class DateFormatterYMDPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {    
    return Converter.toYYYYMMDD(value);
  }
}

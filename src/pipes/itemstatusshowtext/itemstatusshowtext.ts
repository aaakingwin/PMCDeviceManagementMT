import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'itemStatusShowText',
})
export class ItemStatusShowTextPipe implements PipeTransform {
  //项目状态
  transform(value: boolean, ...args) {
    if(value)
    {
      return '正常';
    }
    else
    {
      return '异常';
    }    
  }
}

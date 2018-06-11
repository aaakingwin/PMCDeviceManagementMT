import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'itemStatusImg',
})
export class ItemStatusImgPipe implements PipeTransform {
  //项目状态图片
  transform(value: string) {
    if(value=='正常')
    {
      return 'yes.png';
    }
    else
    {
      return 'no.png';
    }    
  }
}

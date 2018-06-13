import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'assetTypeImg',
})
export class AssetTypeImgPipe implements PipeTransform {
  //资产类型图片
  transform(value: string) {
    let retValue='';
    switch(value)
    {
      case '监控设备' : { retValue='at_monitor.svg'; break; }
      case '电梯设施' : { retValue='at_elevator.svg'; break; }
      default : { retValue=''; break; }
    }
    return retValue;
  }
}

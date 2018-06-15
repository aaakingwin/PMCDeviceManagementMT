import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'assetTypeImg',
})
export class AssetTypeImgPipe implements PipeTransform {
  //资产类型图片
  transform(value: string, ...args) {
    return 'asset.png';
  }
}

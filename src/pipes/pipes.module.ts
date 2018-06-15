import { NgModule } from '@angular/core';
import { AssetTypeImgPipe } from './assettypeimg/assettypeimg';
import { ItemStatusImgPipe } from './itemstatusimg/itemstatusimg';
import { DateFormatterYMDPipe } from './dateformatterymd/dateformatterymd';
@NgModule({
	declarations: [   
        AssetTypeImgPipe,
        ItemStatusImgPipe,
        DateFormatterYMDPipe
    ],
	imports: [],
	exports: [
        AssetTypeImgPipe,
        ItemStatusImgPipe,
        DateFormatterYMDPipe
    ]
})
export class PipesModule {}

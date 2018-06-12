import { NgModule } from '@angular/core';
import { AssetTypeImgPipe } from './assettypeimg/assettypeimg';
import { ItemStatusImgPipe } from './itemstatusimg/itemstatusimg';
import { ItemStatusShowTextPipe } from './itemstatusshowtext/itemstatusshowtext';
import { DateFormatterYMDPipe } from './dateformatterymd/dateformatterymd';
@NgModule({
	declarations: [   
        AssetTypeImgPipe,
        ItemStatusImgPipe,
    ItemStatusShowTextPipe,
    DateFormatterYMDPipe
    ],
	imports: [],
	exports: [
        AssetTypeImgPipe,
        ItemStatusImgPipe,
    ItemStatusShowTextPipe,
    DateFormatterYMDPipe
    ]
})
export class PipesModule {}

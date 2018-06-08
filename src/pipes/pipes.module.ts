import { NgModule } from '@angular/core';
import { AssetTypeImgPipe } from './assettypeimg/assettypeimg';
import { ItemStatusImgPipe } from './itemstatusimg/itemstatusimg';
import { ItemStatusShowTextPipe } from './itemstatusshowtext/itemstatusshowtext';
@NgModule({
	declarations: [   
        AssetTypeImgPipe,
        ItemStatusImgPipe,
    ItemStatusShowTextPipe
    ],
	imports: [],
	exports: [
        AssetTypeImgPipe,
        ItemStatusImgPipe,
    ItemStatusShowTextPipe
    ]
})
export class PipesModule {}

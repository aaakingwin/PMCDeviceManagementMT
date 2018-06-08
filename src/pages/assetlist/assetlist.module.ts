import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetlistPage } from './assetlist';

@NgModule({
  declarations: [
    AssetlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetlistPage),
  ],
})
export class AssetlistPageModule {}

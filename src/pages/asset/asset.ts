import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-asset',
  templateUrl: 'asset.html',
})
export class AssetPage {
  assetData:AssetData;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.assetData=this.navParams.get('asset'); 
    if(Verifier.isNull(this.assetData))
    {
      this.assetData=new AssetData();
    }
  }
}

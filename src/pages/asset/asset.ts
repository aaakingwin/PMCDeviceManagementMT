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
  item:AssetData;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.item=this.navParams.get('item'); 
    if(Verifier.isNull(this.item))
    {
      this.item=new AssetData();
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';

@IonicPage()
@Component({
  selector: 'page-asset',
  templateUrl: 'asset.html',
})
export class AssetPage {
  item:AssetData;
  id:string;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.item=this.navParams.get('item'); 
  }

  ionViewDidLoad() {}
}

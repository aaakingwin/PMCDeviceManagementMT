import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { AssetPage } from '../asset/asset';
import { WebApi } from '../../providers/webapi';

@IonicPage()
@Component({
  selector: 'page-assetlist',
  templateUrl: 'assetlist.html',
})
export class AssetlistPage {
  items: Array<AssetData>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public webApi:WebApi){}

  ionViewDidLoad() {    
    this.loadDataList();
  }

  loadDataList(){
    this.webApi.get<AssetDTO>(AssetApi.GetAll).subscribe(data => {
      this.items=data.Data;
    });
  }

  doRefresh(refresher) {
    this.loadDataList();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  openPage(item) {    
    this.navCtrl.push(AssetPage,{'item':item});
  }
}

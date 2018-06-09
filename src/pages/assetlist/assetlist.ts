import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetPage } from '../asset/asset';
import { WebApi } from '../../providers/webapi';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { MicrodistrictData, MicrodistrictDTO, MicrodistrictApi } from '../../models/microdistrictdata';

@IonicPage()
@Component({
  selector: 'page-assetlist',
  templateUrl: 'assetlist.html',
})
export class AssetlistPage {
  assetlist: AssetData[];
  microdistrictlist:MicrodistrictData[];
  mid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public webApi:WebApi)
  {
    this.loadMicrodistrictList();
  }

  ionViewDidLoad() {}

  getDataList()
  {
    this.loadAssetList();
  }

  openPage(item) {    
    this.navCtrl.push(AssetPage,{'item':item});
  }

  loadAssetList(){
    console.log(this.mid);
    this.webApi.get<AssetDTO>(AssetApi.GetMultiple+'microdistrictid='+this.mid).subscribe(data => {
      this.assetlist=data.Data;
    });
  }

  loadMicrodistrictList()
  {
    this.webApi.get<MicrodistrictDTO>(MicrodistrictApi.GetAll).subscribe(data=>{
      this.microdistrictlist=data.Data;
    });
  }
}

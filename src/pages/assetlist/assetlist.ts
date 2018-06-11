import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetPage } from '../asset/asset';
import { WebApi } from '../../providers/webapi';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-assetlist',
  templateUrl: 'assetlist.html',
})
export class AssetlistPage {
  assetlist: AssetData[];
  microdistrict:MicrodistrictData;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl:ToastController,public webApi:WebApi)
  {
    this.microdistrict=this.navParams.get('microdistrict');  
    if(this.microdistrict==null)
    {
      this.microdistrict=new MicrodistrictData();
    } 
  }

  ionViewDidLoad() {
    this.loadDataList();
  }

  loadDataList(){
    if(this.microdistrict!=null && this.microdistrict.Id!=null && this.microdistrict.Id!='undefined')
    {
      this.webApi.get<AssetDTO>(AssetApi.GetMultipleByMicrodistrictid+this.microdistrict.Id).subscribe(res => {
        this.assetlist=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openPage(item) {    
    this.navCtrl.push(AssetPage,{'item':item});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(item!=null)
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetlistPage,{'microdistrict':item});
    }
  }
}

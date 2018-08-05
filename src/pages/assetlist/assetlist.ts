import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetPage } from '../asset/asset';
import { WebApi } from '../../providers/webapi';
import { AssetData, AssetApi, AssetResponse } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { MessageService } from '../../providers/messageservice';
import { Verifier } from '../../providers/verifier';
import { UserService } from '../../providers/userservice';
import { SysConfig } from '../../providers/sysconfig';

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
    if(Verifier.isNull(this.microdistrict))
    {
      this.microdistrict=new MicrodistrictData();
      this.microdistrict.Name=SysConfig.ShowText_SelectedMicrodistrict;
    } 
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.microdistrict) && !Verifier.isNull(this.microdistrict.Id))
    {
      this.webApi.get<AssetResponse>(AssetApi.getDataByMicrodistrictId(UserService.getUserId(),this.microdistrict.Id)).subscribe(res => {
        if(res.Success)
        {
          this.assetlist=res.Data;
        }
        else
        {
          MessageService.showInfo(this.toastCtrl,res.Message);
        }        
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openPage(item) {    
    this.navCtrl.push(AssetPage,{'asset':item});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(!Verifier.isNull(item))
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetlistPage,{'microdistrict':item});
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MessageService } from '../../providers/messageservice';
import { AssetData, AssetApi, AssetResponse } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { WebApi } from '../../providers/webapi';
import { AssetmaintenancerecordPage } from '../assetmaintenancerecord/assetmaintenancerecord';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-assetmaintenance',
  templateUrl: 'assetmaintenance.html',
})
export class AssetmaintenancePage {
  assetlist: AssetData[];
  microdistrict:MicrodistrictData;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.microdistrict=this.navParams.get('microdistrict');  
    if(Verifier.isNull(this.microdistrict))
    {
      this.microdistrict=new MicrodistrictData();
    } 
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.microdistrict) && !Verifier.isNull(this.microdistrict.Id))
    {
      this.webApi.get<AssetResponse>(AssetApi.GetMultipleByMicrodistrictid+this.microdistrict.Id).subscribe(res => {
        this.assetlist=res.Data;
      });
    }
  }

  openListPage(item) {    
    this.navCtrl.push(AssetmaintenancerecordPage,{'item':item});
  }

  openPage(item) {    
    this.navCtrl.push(MaintenancesheetPage,{'item':item});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(!Verifier.isNull(item))
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetmaintenancePage,{'microdistrict':item});
    }
  }

  scanCallback =(text) => {   
    if(!Verifier.isNull(text))
    {     
      this.webApi.get<AssetResponse>(AssetApi.GetSingleByNumber+text).subscribe(res => {
        if(res.Data.length>0)
        {
          let assetdata=res.Data[0];
          this.navCtrl.pop(); 
          this.navCtrl.push(MaintenancesheetPage,{'item':assetdata});
        }
        else
        {
          //this.msg.showInfo('无效的二维码！');
          this.navCtrl.pop(); 
        }      
      });    
    }
    else
    {
      //this.msg.showInfo('无效的二维码！');
      this.navCtrl.pop(); 
    }
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 
}

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
import { SysConfig } from '../../providers/sysconfig';
import { UserService } from '../../providers/userservice';

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
      this.microdistrict.Name=SysConfig.ShowText_SelectedMicrodistrict;
    }    
  }

  ionViewWillEnter()
  {
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.microdistrict) && !Verifier.isNull(this.microdistrict.Id))
    {
      this.webApi.get<AssetResponse>(AssetApi.getDataByMicrodistrictId(UserService.getUserId(),this.microdistrict.Id)).subscribe(res => {
        this.assetlist=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openListPage(item) {    
    this.navCtrl.push(AssetmaintenancerecordPage,{'asset':item});
  }

  openPage(item) {    
    this.navCtrl.push(MaintenancesheetPage,{'asset':item,'optType':SysConfig.OperationType_Create});
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

  scan() {    
    if(Verifier.isNull(this.microdistrict.Id))
    {
      MessageService.showInfo(this.toastCtrl,SysConfig.ShowText_SelectedMicrodistrict);
    }
    else
    {
      this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
    }
  } 

  scanCallback =(text) => {   
    if(!Verifier.isNull(text))
    {     
      this.webApi.get<AssetResponse>(AssetApi.getDataByNumber(UserService.getUserId(),text)).subscribe(res => {
        let assetdata=res.Data;  
        this.navCtrl.pop(); 
        this.navCtrl.push(MaintenancesheetPage,{'asset':assetdata,'optType':SysConfig.OperationType_Create}); 
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
        this.navCtrl.pop();
      }); 
    }
    else
    {
      MessageService.showInfo(this.toastCtrl,'无效的二维码');
      this.navCtrl.pop(); 
    }
  } 
}

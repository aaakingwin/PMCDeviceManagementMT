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

  openListPage(item) {    
    this.navCtrl.push(AssetmaintenancerecordPage,{'asset':item});
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
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

  scanCallback =(text) => {   
    if(!Verifier.isNull(text))
    {     
      this.webApi.get<AssetResponse>(AssetApi.getDataByNumber(UserService.getUserId(),text)).subscribe(res => {
        if(res.Success)
        {
          let assetdata=res.Data;  
          this.navCtrl.pop(); 
          this.apply(assetdata);
        }
        else
        {
          MessageService.showInfo(this.toastCtrl,res.Message);  
          this.navCtrl.pop();
        }       
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

  openPage(item) {    
    this.apply(item);
  }

  apply(item){
    if(item.AssetStatus!='报修')
    {
      this.navCtrl.push(MaintenancesheetPage,{'asset':item,'optType':SysConfig.OperationType_Create});
    }
    else
    {
      MessageService.showInfo(this.toastCtrl,'已申请');
    }
  }
}

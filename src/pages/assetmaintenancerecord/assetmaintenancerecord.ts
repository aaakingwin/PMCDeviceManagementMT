import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { MaintenanceData, MaintenanceResponse, MaintenanceApi } from '../../models/maintenancedata';
import { WebApi } from '../../providers/webapi';
import { Verifier } from '../../providers/verifier';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-assetmaintenancerecord',
  templateUrl: 'assetmaintenancerecord.html',
})
export class AssetmaintenancerecordPage {
  assetdata:AssetData;
  maintenancelist:MaintenanceData[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.assetdata=this.navParams.get('asset');
    if(Verifier.isNull(this.assetdata))
    {
      this.assetdata=new AssetData();
    }
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.assetdata) && !Verifier.isNull(this.assetdata.Id))
    {
      this.webApi.get<MaintenanceResponse>(MaintenanceApi.getDataByAssetId(UserService.getUserId(),this.assetdata.Id)).subscribe(res => {
        if(res.Success)
        {
          this.maintenancelist=res.Data;
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

  openPage(item)
  {    
    this.navCtrl.push(MaintenancesheetPage,{'maintenance':item,'asset':this.assetdata,'optType':SysConfig.OperationType_See});
  }
}

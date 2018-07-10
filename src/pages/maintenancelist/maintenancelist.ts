import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MaintenanceData, MaintenanceResponse, MaintenanceApi } from '../../models/maintenancedata';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { WebApi } from '../../providers/webapi';
import { Verifier } from '../../providers/verifier';
import { AssetResponse, AssetApi } from '../../models/assetdata';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';
import { Converter } from '../../providers/converter';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-maintenancelist',
  templateUrl: 'maintenancelist.html',
})
export class MaintenancelistPage {
  querydate:string=new Date().toISOString();
  maintenancelist: MaintenanceData[];
  constructor(public navCtrl: NavController,public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
      this.loadDataList(this.querydate);
    }

  loadDataList(date){
    if(!Verifier.isNull(date))
    {
      let applieddate=Converter.toYYYYMMDD(date);
      this.webApi.get<MaintenanceResponse>(MaintenanceApi.getDataByApplicationDate(UserService.getUserId(),applieddate)).subscribe(res => {
        this.maintenancelist=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      });
    }   
  }

  openPage(item) {    
    this.webApi.get<AssetResponse>(AssetApi.getDataByNumber(UserService.getUserId(),item.AssetNumber)).subscribe(res => {
      let assetdata=res.Data;  
      this.navCtrl.push(MaintenancesheetPage,{'maintenance':item,'asset':assetdata,'optType':SysConfig.OperationType_See});   
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    });     
  }

  changeDate(_event)
  {   
    this.loadDataList(_event);
  }
}

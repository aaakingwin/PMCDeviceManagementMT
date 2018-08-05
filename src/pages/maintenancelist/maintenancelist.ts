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
  bod:string;
  eod:string;
  maintenancelist: MaintenanceData[];
  constructor(public navCtrl: NavController,public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
      this.bod=new Date().toISOString();
      this.eod=new Date().toISOString();
      this.loadDataList();
    }

  loadDataList(){
    if(!Verifier.isNull(this.bod) && !Verifier.isNull(this.eod))
    {
      if(this.bod>this.eod)
      {
        MessageService.showInfo(this.toastCtrl,'开始日期不能大于结束日期');
      }
      else
      {
        let b=Converter.toYYYYMMDD(this.bod);
        let e=Converter.toYYYYMMDD(this.eod);
        this.webApi.get<MaintenanceResponse>(MaintenanceApi.getDataByApplicationDate(UserService.getUserId(),b,e)).subscribe(res => {
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
  }

  openPage(item) {    
    this.webApi.get<AssetResponse>(AssetApi.getDataByNumber(UserService.getUserId(),item.AssetNumber)).subscribe(res => {
      if(res.Success)
      {
        let assetdata=res.Data;  
        this.navCtrl.push(MaintenancesheetPage,{'maintenance':item,'asset':assetdata,'optType':SysConfig.OperationType_See}); 
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

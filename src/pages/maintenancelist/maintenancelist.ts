import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { WebApi } from '../../providers/webapi';
import { Verifier } from '../../providers/verifier';
import { AssetResponse, AssetApi } from '../../models/assetdata';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-maintenancelist',
  templateUrl: 'maintenancelist.html',
})
export class MaintenancelistPage {
  querydate:string=new Date().toISOString();
  items: MaintenancesheetData[];
  constructor(public navCtrl: NavController,public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
      this.loadDataList(this.querydate);
    }

  loadDataList(date){
    if(!Verifier.isNull(date))
    {
     /*  let inspectiondate=Converter.toYYYYMMDD(date);
      this.webApi.get<InspectionsheetResponse>(InspectionsheetApi.GetMultipleByInspectiondate+inspectiondate).subscribe(res => {
        this.items=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      });  */
    }   
  }

  openPage(item) {
    this.webApi.get<AssetResponse>(AssetApi.getSingleByNumber(item.AssetNumber)).subscribe(res => {
      if(res.Count>0)
      {
        let assetdata=res.Data;  
        this.navCtrl.push(MaintenancesheetPage,{'maintenancesheet':item,'asset':assetdata,'optType':SysConfig.OperationType_See});
      }   
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    });     
  }

  changeDate(_event)
  {   
    this.loadDataList(_event);
  }
}

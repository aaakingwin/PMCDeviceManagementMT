import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { WebApi } from '../../providers/webapi';
import { Verifier } from '../../providers/verifier';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { SysConfig } from '../../providers/sysconfig';

@IonicPage()
@Component({
  selector: 'page-assetmaintenancerecord',
  templateUrl: 'assetmaintenancerecord.html',
})
export class AssetmaintenancerecordPage {
  assetdata:AssetData;
  items:MaintenancesheetData[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.assetdata=this.navParams.get('item');
    if(Verifier.isNull(this.assetdata))
    {
      this.assetdata=new AssetData();
    }
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.assetdata) && !Verifier.isNull(this.assetdata.Id))
    {
      /* this.webApi.get<InspectionsheetResponse>(InspectionsheetApi.GetMultipleByAssetId+this.assetdata.Id).subscribe(res => {
        this.items=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      });  */
    }
  }

  openPage(item)
  {    
    this.navCtrl.push(MaintenancesheetPage,{'maintenancesheet':item,'asset':this.assetdata,'optType':SysConfig.OperationType_See});
  }
}

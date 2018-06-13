import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { InspectionsheetData, InspectionsheetApi, InspectionsheetResponse } from '../../models/inspectionsheetdata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { SysConfig } from '../../providers/sysconfig';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-assetinspectionrecord',
  templateUrl: 'assetinspectionrecord.html',
})
export class AssetinspectionrecordPage {
  assetdata:AssetData;
  items:InspectionsheetData[];
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
      this.webApi.get<InspectionsheetResponse>(InspectionsheetApi.getMultipleByAssetId(this.assetdata.Id)).subscribe(res => {
        this.items=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openPage(item)
  {    
    this.navCtrl.push(InspectionsheetPage,{'inspectionsheet':item,'asset':this.assetdata,'optType':SysConfig.OperationType_See});
  }
}

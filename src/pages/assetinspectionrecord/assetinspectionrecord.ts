import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { InspectionData, InspectionApi, InspectionResponse } from '../../models/inspectiondata';
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
  items:InspectionData[];
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
      this.webApi.get<InspectionResponse>(InspectionApi.getMultipleByAssetId(this.assetdata.Id)).subscribe(res => {
        this.items=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openPage(item)
  {    
    this.navCtrl.push(InspectionsheetPage,{'inspection':item,'asset':this.assetdata,'optType':SysConfig.OperationType_See});
  }
}

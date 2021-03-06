import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { InspectionData, InspectionApi, InspectionResponse } from '../../models/inspectiondata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { SysConfig } from '../../providers/sysconfig';
import { Verifier } from '../../providers/verifier';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-assetinspectionrecord',
  templateUrl: 'assetinspectionrecord.html',
})
export class AssetinspectionrecordPage {
  assetdata:AssetData;
  inspectionlist:InspectionData[];
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
      this.webApi.get<InspectionResponse>(InspectionApi.getDataByAssetId(UserService.getUserId(),this.assetdata.Id)).subscribe(res => {
        if(res.Success)
        {
          this.inspectionlist=res.Data;
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
    this.navCtrl.push(InspectionsheetPage,{'inspection':item,'asset':this.assetdata,'optType':SysConfig.OperationType_See});
  }
}

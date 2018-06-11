import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetData } from '../../models/assetdata';
import { InspectionsheetData, InspectionsheetDTO, InspectionsheetApi } from '../../models/inspectionsheetdata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { SysConfig } from '../../providers/sysconfig';

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
    if(this.assetdata==null)
    {
      this.assetdata=new AssetData();
    }
  }

  ionViewDidLoad() {
    this.loadDataList();
  }

  loadDataList(){
    if(this.assetdata!=null && this.assetdata.Id!=null && this.assetdata.Id!='undefined')
    {
      this.webApi.get<InspectionsheetDTO>(InspectionsheetApi.GetMultipleByAssetId+this.assetdata.Id).subscribe(res => {
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

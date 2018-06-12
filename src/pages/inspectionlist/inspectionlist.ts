import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InspectionsheetData, InspectionsheetApi, InspectionsheetResponse } from '../../models/inspectionsheetdata';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { WebApi } from '../../providers/webapi';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';
import { AssetResponse, AssetApi } from '../../models/assetdata';
import { Converter } from '../../providers/converter';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-inspectionlist',
  templateUrl: 'inspectionlist.html',
})
export class InspectionlistPage {
  querydate:string=new Date().toISOString();
  items: InspectionsheetData[];
  constructor(public navCtrl: NavController,public navParams: NavParams,
    public toastCtrl:ToastController,public webApi:WebApi) {
      this.loadDataList(this.querydate);
    }

  loadDataList(date){
    if(!Verifier.isNull(date))
    {
      let inspectiondate=Converter.toYYYYMMDD(date);
      this.webApi.get<InspectionsheetResponse>(InspectionsheetApi.GetMultipleByInspectiondate+inspectiondate).subscribe(res => {
        this.items=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }   
  }

  openPage(item) {
    this.webApi.get<AssetResponse>(AssetApi.GetSingleByNumber+item.AssetNumber).subscribe(res => {
      if(res.Count>0)
      {
        let assetdata=res.Data;  
        this.navCtrl.push(InspectionsheetPage,{'inspectionsheet':item,'asset':assetdata,'optType':SysConfig.OperationType_See});
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { AssetData, AssetApi, AssetResponse } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { AssetinspectionrecordPage } from '../assetinspectionrecord/assetinspectionrecord';
import { SysConfig } from '../../providers/sysconfig';
import { Verifier } from '../../providers/verifier';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-assetinspection',
  templateUrl: 'assetinspection.html',
})
export class AssetinspectionPage {
  assetlist: AssetData[];
  microdistrict:MicrodistrictData;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.microdistrict=this.navParams.get('microdistrict');  
    if(Verifier.isNull(this.microdistrict))
    {
      this.microdistrict=new MicrodistrictData();
      this.microdistrict.Name=SysConfig.ShowText_SelectedMicrodistrict;
    } 
  }

  ionViewWillEnter()
  {
    this.loadDataList();
  }

  loadDataList(){
    if(!Verifier.isNull(this.microdistrict) && !Verifier.isNull(this.microdistrict.Id))
    {
      this.webApi.get<AssetResponse>(AssetApi.getDataByMicrodistrictId(UserService.getUserId(),this.microdistrict.Id)).subscribe(res => {
        if(res.Success)
        {
          this.assetlist=res.Data;
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

  openListPage(item) {    
    this.navCtrl.push(AssetinspectionrecordPage,{'asset':item});
  }

  openPage(item) {    
    this.navCtrl.push(InspectionsheetPage,{'asset':item,'optType':SysConfig.OperationType_Create});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(!Verifier.isNull(item))
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetinspectionPage,{'microdistrict':item});
    }
  }

  scan() {        
      this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

  scanCallback =(text) => {   
    if(!Verifier.isNull(text))
    {     
      this.webApi.get<AssetResponse>(AssetApi.getDataByNumber(UserService.getUserId(),text)).subscribe(res => {
        if(res.Success)
        {
          let assetdata=res.Data;  
          this.navCtrl.pop(); 
          this.navCtrl.push(InspectionsheetPage,{'asset':assetdata,'optType':SysConfig.OperationType_Create});
        }
        else
        {
          MessageService.showInfo(this.toastCtrl,res.Message);  
          this.navCtrl.pop();
        }        
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
        this.navCtrl.pop();
      }); 
    }
    else
    {
      MessageService.showInfo(this.toastCtrl,'无效的二维码');
      this.navCtrl.pop(); 
    }
  } 
}

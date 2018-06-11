import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { AssetinspectionrecordPage } from '../assetinspectionrecord/assetinspectionrecord';
import { SysConfig } from '../../providers/sysconfig';

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
    if(this.microdistrict==null)
    {
      this.microdistrict=new MicrodistrictData();
    } 
  }

  ionViewDidLoad() {
    this.loadDataList();
  }

  loadDataList(){
    if(this.microdistrict!=null && this.microdistrict.Id!=null && this.microdistrict.Id!='undefined')
    {
      this.webApi.get<AssetDTO>(AssetApi.GetMultipleByMicrodistrictid+this.microdistrict.Id).subscribe(res => {
        this.assetlist=res.Data;
      }, error => {
        MessageService.showWebApiError(this.toastCtrl,error);  
      }); 
    }
  }

  openListPage(item) {    
    this.navCtrl.push(AssetinspectionrecordPage,{'item':item});
  }

  openPage(item) {    
    this.navCtrl.push(InspectionsheetPage,{'asset':item,'optType':SysConfig.OperationType_Create});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(item!=null)
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetinspectionPage,{'microdistrict':item});
    }
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

  scanCallback =(text) => {   
    if(text!=null && text!='undefined')
    {     
      this.webApi.get<AssetDTO>(AssetApi.GetSingleByNumber+text).subscribe(res => {
        if(res.Count>0)
        {
          let assetdata=res.Data[0];
          this.navCtrl.pop(); 
          this.navCtrl.push(InspectionsheetPage,{'item':assetdata});
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
      MessageService.showInfo(this.toastCtrl,'无效的二维码！');
      this.navCtrl.pop(); 
    }
  } 
}

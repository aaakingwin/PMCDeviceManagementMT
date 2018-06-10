import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { AssetinspectionrecordPage } from '../assetinspectionrecord/assetinspectionrecord';

@IonicPage()
@Component({
  selector: 'page-assetinspection',
  templateUrl: 'assetinspection.html',
})
export class AssetinspectionPage {
  msg:MessageService=new MessageService(this.toastCtrl);
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
    if(this.microdistrict!=null)
    {
      this.loadDataList();
    }
  }

  loadDataList(){
    this.webApi.get<AssetDTO>(AssetApi.GetMultiple+'microdistrictid='+this.microdistrict.Id).subscribe(res => {
      this.assetlist=res.Data;
    });
  }

  openListPage(item) {    
    this.navCtrl.push(AssetinspectionrecordPage,{'item':item});
  }

  openPage(item) {    
    this.navCtrl.push(InspectionsheetPage,{'item':item});
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

  scanCallback =(text) => {   
    if(text!=null)
    {     
      this.webApi.get<AssetDTO>(AssetApi.GetSingle+"number="+text).subscribe(res => {
        if(res.Data.length>0)
        {
          let assetdata=res.Data[0];
          this.navCtrl.pop(); 
          this.navCtrl.push(InspectionsheetPage,{'item':assetdata});
        }
        else
        {
          this.msg.showInfo('无效的二维码！');
          this.navCtrl.pop(); 
        }      
      });    
    }
    else
    {
      this.msg.showInfo('无效的二维码！');
      this.navCtrl.pop(); 
    }
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

}

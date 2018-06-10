import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MessageService } from '../../providers/messageservice';
import { AssetData, AssetDTO, AssetApi } from '../../models/assetdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { WebApi } from '../../providers/webapi';
import { AssetmaintenancerecordPage } from '../assetmaintenancerecord/assetmaintenancerecord';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { SelectmicrodistrictPage } from '../selectmicrodistrict/selectmicrodistrict';

@IonicPage()
@Component({
  selector: 'page-assetmaintenance',
  templateUrl: 'assetmaintenance.html',
})
export class AssetmaintenancePage {
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
    this.navCtrl.push(AssetmaintenancerecordPage,{'item':item});
  }

  openPage(item) {    
    this.navCtrl.push(MaintenancesheetPage,{'item':item});
  }

  selectMicrodistrict(){
    this.navCtrl.push(SelectmicrodistrictPage,{'callback': this.selectMicrodistrictCallback});
  }

  selectMicrodistrictCallback =(item) => {  
    if(item!=null)
    {        
      this.navCtrl.pop(); 
      this.navCtrl.setRoot(AssetmaintenancePage,{'microdistrict':item});
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
          this.navCtrl.push(MaintenancesheetPage,{'item':assetdata});
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

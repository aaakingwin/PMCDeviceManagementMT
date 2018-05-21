import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { InspectionsheetProvider } from '../../providers/inspectionsheet/inspectionsheet';
import { InspectionsheetData } from '../../models/inspectionsheetdata';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-inspectionlist',
  templateUrl: 'inspectionlist.html',
})
export class InspectionlistPage {
  msg:MessageService=new MessageService(this.toastCtrl);
  headingText:string=SysConfig.AppHeadingText;
  items: Array<InspectionsheetData>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public inspectionsheetProvider:InspectionsheetProvider) {}

  ionViewDidLoad() {    
    this.loadDataList();
  }

  scanCallback =(text) => {
    try {
      let data=this.inspectionsheetProvider.convertToData(text);      
      if(data!=null)
      {        
        this.navCtrl.pop(); 
        this.navCtrl.push(InspectionsheetPage,{'data':data});
      }
      else
      {
        this.msg.showInfo('无效的二维码！');
        this.navCtrl.pop(); 
      }
    }
    catch (err) {
      this.msg.showInfo('无效的二维码！');
      this.navCtrl.pop();  
    }
  }

  loadDataList(){
    this.items=this.inspectionsheetProvider.getDataList();
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

  doRefresh(refresher) {
    this.loadDataList();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  openPage(item) {
    this.navCtrl.push(InspectionsheetPage,{'data':item});
  }
}

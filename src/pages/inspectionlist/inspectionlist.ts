import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../common/sysconfig';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { InspectionsheetService } from '../../service/inspectionsheetservice';

@IonicPage()
@Component({
  selector: 'page-inspectionlist',
  templateUrl: 'inspectionlist.html',
})
export class InspectionlistPage {
  headingText:string=SysConfig.AppHeadingText;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public inspectionsheetService:InspectionsheetService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionlistPage');
  }

  scanCallback =(text) => {
    try {
      let data=this.inspectionsheetService.convertToData(text);      
      if(data!=null)
      {        
        this.navCtrl.pop(); 
        this.navCtrl.push(InspectionsheetPage,{'data':data});
      }
      else
      {
        this.navCtrl.pop(); 
      }
    }
    catch (err) {
      alert(SysConfig.Msg_InvalidQRCode);
      this.navCtrl.pop();  
    }
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 
}

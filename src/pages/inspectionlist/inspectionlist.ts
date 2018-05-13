import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../common/sysconfig';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { InspectionsheetService } from '../../service/inspectionsheetservice';
import { InspectionsheetData } from '../../model/inspectionsheetdata';

@IonicPage()
@Component({
  selector: 'page-inspectionlist',
  templateUrl: 'inspectionlist.html',
})
export class InspectionlistPage {
  headingText:string=SysConfig.AppHeadingText;
  items: Array<InspectionsheetData>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public inspectionsheetService:InspectionsheetService) {}

  ionViewDidLoad() {    
    this.items=this.inspectionsheetService.getInspectionsheetList();
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
        alert('无效的二维码！');
        this.navCtrl.pop(); 
      }
    }
    catch (err) {
      alert('无效的二维码！');
      this.navCtrl.pop();  
    }
  }

  scan() {    
    this.navCtrl.push('ScanPage',{'callback': this.scanCallback});    
  } 

  openPage(item) {
    this.navCtrl.push(InspectionsheetPage,{'data':item});
  }
}

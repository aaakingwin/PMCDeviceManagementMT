import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InspectionsheetData } from '../../models/inspectionsheetdata';
import { InspectionsheetPage } from '../inspectionsheet/inspectionsheet';
import { WebApi } from '../../providers/webapi';

@IonicPage()
@Component({
  selector: 'page-inspectionlist',
  templateUrl: 'inspectionlist.html',
})
export class InspectionlistPage {
  querydate:string;
  items: Array<InspectionsheetData>;

  constructor(public navCtrl: NavController,public navParams: NavParams,public webApi:WebApi) 
    {
      this.querydate=new Date().toISOString();
    }

  ionViewDidLoad() {    
    this.loadDataList();
  }

  loadDataList(){

  }

  openPage(item) {
    this.navCtrl.push(InspectionsheetPage,{'item':item});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';

@IonicPage()
@Component({
  selector: 'page-maintenancelist',
  templateUrl: 'maintenancelist.html',
})
export class MaintenancelistPage {
  querydate:string;
  items: Array<MaintenancesheetData>;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.querydate=new Date().toISOString();
      this.loadDataList();
  }

  loadDataList(){
    
  }

  openPage(item) {
    //this.navCtrl.push(MaintenancesheetPage,{'data':item});
  }
}

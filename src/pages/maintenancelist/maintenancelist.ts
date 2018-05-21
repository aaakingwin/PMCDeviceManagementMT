import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';
import { MaintenancesheetProvider } from '../../providers/maintenancesheet/maintenancesheet';

@IonicPage()
@Component({
  selector: 'page-maintenancelist',
  templateUrl: 'maintenancelist.html',
})
export class MaintenancelistPage {
  headingText:string=SysConfig.AppHeadingText;
  items: Array<MaintenancesheetData>;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public maintenancesheetProvider:MaintenancesheetProvider) {
  }

  ionViewDidLoad() {    
    this.loadDataList();
  }

  loadDataList(){
    this.items=this.maintenancesheetProvider.getDataList();
  }

  apply() {    
    let item = new MaintenancesheetData();
    this.navCtrl.push(MaintenancesheetPage,{'data':item});
  } 

  openPage(item) {
    this.navCtrl.push(MaintenancesheetPage,{'data':item});
  }

  doRefresh(refresher) {
    this.loadDataList();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}

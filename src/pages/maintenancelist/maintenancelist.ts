import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../common/sysconfig';
import { MaintenancesheetData } from '../../model/maintenancesheetdata';
import { MaintenancesheetPage } from '../maintenancesheet/maintenancesheet';

@IonicPage()
@Component({
  selector: 'page-maintenancelist',
  templateUrl: 'maintenancelist.html',
})
export class MaintenancelistPage {
  headingText:string=SysConfig.AppHeadingText;
  items: Array<MaintenancesheetData>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenancelistPage');
  }

  apply() {    
    
  } 

  openPage(item) {
    this.navCtrl.push(MaintenancesheetPage,{'data':item});
  }
}

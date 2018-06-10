import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetlistPage } from '../assetlist/assetlist';
import { SettingPage } from '../setting/setting';
import { InspectionlistPage } from '../inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../maintenancelist/maintenancelist';
import { AssetinspectionPage } from '../assetinspection/assetinspection';
import { AssetmaintenancePage } from '../assetmaintenance/assetmaintenance';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      {title: '巡检', component: AssetinspectionPage},
      {title: '维保', component: AssetmaintenancePage},
      {title: '巡检记录', component: InspectionlistPage},
      {title: '维保记录', component: MaintenancelistPage},
      {title: '资产', component: AssetlistPage},
      {title: '系统设置', component: SettingPage}
    ];
  }

  ionViewDidLoad() {}

  openPage(page) {    
    this.navCtrl.setRoot(page.component);
  }
}

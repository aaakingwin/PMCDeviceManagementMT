import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { InspectionlistPage } from '../inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../maintenancelist/maintenancelist';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoots: Object[];

  constructor(public navCtrl: NavController) {
    this.tabRoots = [
    {
      root: InspectionlistPage,
      tabTitle: '巡检',
      tabIcon: 'clipboard'
    },
    {
      root: MaintenancelistPage,
      tabTitle: '维保',
      tabIcon: 'construct'
    }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}

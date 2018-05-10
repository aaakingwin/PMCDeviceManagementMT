import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
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
    this.tabRoots = [{
      root: HomePage,
      tabTitle: 'home',
      tabIcon: 'home'
    },
    {
      root: InspectionlistPage,
      tabTitle: '巡检',
      tabIcon: 'home'
    },
    {
      root: MaintenancelistPage,
      tabTitle: '维保',
      tabIcon: 'home'
    }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}

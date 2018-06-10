import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { UserData } from '../models/userdata';
import { SysConfig } from '../providers/sysconfig';
import { StorageService } from '../providers/storageservice';
import { AssetlistPage } from '../pages/assetlist/assetlist';
import { HomePage } from '../pages/home/home';
import { AssetinspectionPage } from '../pages/assetinspection/assetinspection';
import { AssetmaintenancePage } from '../pages/assetmaintenance/assetmaintenance';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storageService: StorageService) {
    this.initializeApp();
    this.login();
    this.pages = [
      {title: '首页', component: HomePage },
      {title: '巡检', component: AssetinspectionPage},
      {title: '维保', component: AssetmaintenancePage},
      {title: '巡检记录', component: InspectionlistPage},
      {title: '维保记录', component: MaintenancelistPage},
      {title: '资产', component: AssetlistPage},
      {title: '系统设置', component: SettingPage}
    ];    
  }

  login()
  {
    //判断用户是否已经登录
    let userdata = this.storageService.read<UserData>(SysConfig.StorageKey_UserData);
     if(userdata!=null)
    {
      this.rootPage=HomePage;
    }
    else
    {
      this.rootPage=LoginPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}


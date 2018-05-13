import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from '../pages/setting/setting';
import { UserInfoData } from '../model/userinfodata';
import { SysConfig } from '../common/sysconfig';
import { StorageService } from '../service/storageservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  menuTitle:string=SysConfig.AppMenuTitle;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storageService: StorageService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: '巡检维保', component: TabsPage},
      {title: '系统设置', component: SettingPage}
    ]
    let userinfo = this.storageService.read<UserInfoData>(SysConfig.StorageKey_UserInfoData);
    if(userinfo!=null)
    {
      this.rootPage=TabsPage;
    }
    else
    {
      this.rootPage=LoginPage;
    }    
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}


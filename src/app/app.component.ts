import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserData, LoginRequest, UserResponse, UserApi } from '../models/userdata';
import { SysConfig } from '../providers/sysconfig';
import { StorageService } from '../providers/storageservice';
import { AssetlistPage } from '../pages/assetlist/assetlist';
import { HomePage } from '../pages/home/home';
import { AssetinspectionPage } from '../pages/assetinspection/assetinspection';
import { AssetmaintenancePage } from '../pages/assetmaintenance/assetmaintenance';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { Verifier } from '../providers/verifier';
import { WebApi } from '../providers/webapi';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  
  rootPage: any;
  userData:UserData;
  pages: Array<{title: string, component: any}>=[
    {title: '首页', component: HomePage },
    {title: '巡检', component: AssetinspectionPage},
    {title: '维保', component: AssetmaintenancePage},
    {title: '巡检记录', component: InspectionlistPage},
    {title: '维保记录', component: MaintenancelistPage},
    {title: '资产', component: AssetlistPage}
  ];    
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public webApi:WebApi) {
    this.initializeApp();
    this.userData=StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    this.login();
  }

  login()
  {
    if(!Verifier.isNull(this.userData))
    {
      let loginRequest=new LoginRequest();
      loginRequest.UserName=this.userData.Name;
      loginRequest.Password=this.userData.Password;    
      this.webApi.post<UserResponse>(UserApi.postLogin(),loginRequest).subscribe(res => {
        this.userData=res.Data;
        this.userData.Password=loginRequest.Password;
        StorageService.write(SysConfig.StorageKey_UserData, this.userData);
        this.rootPage=HomePage;
      }, error => {
        this.rootPage=LoginPage;
      }); 
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


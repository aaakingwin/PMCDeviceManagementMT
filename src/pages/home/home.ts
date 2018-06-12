import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssetlistPage } from '../assetlist/assetlist';
import { InspectionlistPage } from '../inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../maintenancelist/maintenancelist';
import { AssetinspectionPage } from '../assetinspection/assetinspection';
import { AssetmaintenancePage } from '../assetmaintenance/assetmaintenance';
import { StorageService } from '../../providers/storageservice';
import { SysConfig } from '../../providers/sysconfig';
import { LoginPage } from '../login/login';
import { AssetStatusResponse, AssetStatusApi } from '../../models/assetstatusdata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public webApi:WebApi) {
    this.pages = [
      {title: '巡检', component: AssetinspectionPage},
      {title: '维保', component: AssetmaintenancePage},
      {title: '巡检记录', component: InspectionlistPage},
      {title: '维保记录', component: MaintenancelistPage},
      {title: '资产', component: AssetlistPage}
    ];
    this.loadAssetStatusList();
  }

  loadAssetStatusList()
  {
    this.webApi.get<AssetStatusResponse>(AssetStatusApi.GetAll).subscribe(res => {
      let assetStatusList=res.Data;
      StorageService.write(SysConfig.StorageKey_AssetStatusList,assetStatusList);
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }

  openPage(page) {    
    this.navCtrl.setRoot(page.component);
  }

  signout()
  {
    StorageService.remove(SysConfig.StorageKey_UserData);
    this.navCtrl.setRoot(LoginPage);
  }
}

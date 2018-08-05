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
import { UserService } from '../../providers/userservice';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { ChangepasswordPage } from '../changepassword/changepassword';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage { 
  pages: Array<{title: string, component: any, img: string}>=[
    {title: '常规巡检', component: AssetinspectionPage ,img: 'inspection.png'},
    {title: '维保申请', component: AssetmaintenancePage ,img: 'microdistrict.png'},
    {title: '巡检记录', component: InspectionlistPage ,img: 'inspectionrecord.png'},
    {title: '维保记录', component: MaintenancelistPage ,img: 'microdistrictrecord.png'},
    {title: '资产', component: AssetlistPage ,img: 'asset.png'},
    {title: '修改密码', component: ChangepasswordPage ,img: 'changepassword.png'},
    {title: '设置', component: SettingPage ,img: 'setting.png'},
    {title: '关于', component: AboutPage ,img: 'about.png'}
  ];    
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public webApi:WebApi) {
    this.loadAssetStatusList();
  }

  loadAssetStatusList()
  {
    this.webApi.get<AssetStatusResponse>(AssetStatusApi.getAll(UserService.getUserId())).subscribe(res => {
      if(res.Success)
      {
        let assetStatusList=res.Data;
        StorageService.write(SysConfig.StorageKey_AssetStatusList,assetStatusList);
      }
      else
      {
        MessageService.showInfo(this.toastCtrl,res.Message);  
      }    
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }

  openPage(page) {    
    this.navCtrl.setRoot(page.component);
  }

  signout()
  {
    UserService.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}

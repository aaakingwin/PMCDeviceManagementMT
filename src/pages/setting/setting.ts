import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../service/storageservice';
import { SysConfig } from '../../common/sysconfig';
import { LoginPage } from '../login/login';
import { UserInfoData } from '../../model/userinfodata';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  userInfoData:UserInfoData;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private storageService: StorageService) {
      let userinfo = this.storageService.read<UserInfoData>(SysConfig.storagekey_UserInfoData);
      if(userinfo!=null)
      {
        this.userInfoData=userinfo;
      }      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout(){
    this.storageService.remove(SysConfig.storagekey_UserInfoData);
    this.navCtrl.push(LoginPage);
  }
}

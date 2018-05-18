import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../common/storageservice';
import { SysConfig } from '../../common/sysconfig';
import { LoginPage } from '../login/login';
import { UserData } from '../../model/userdata';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  userInfoData:UserData;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private storageService: StorageService) {
      let userinfo = this.storageService.read<UserData>(SysConfig.StorageKey_UserInfoData);
      if(userinfo!=null)
      {
        this.userInfoData=userinfo;
      }      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout(){
    this.storageService.remove(SysConfig.StorageKey_UserInfoData);
    this.navCtrl.push(LoginPage);
  }
}

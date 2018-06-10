import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../providers/storageservice';
import { SysConfig } from '../../providers/sysconfig';
import { LoginPage } from '../login/login';
import { UserData } from '../../models/userdata';

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
      let userinfo = this.storageService.read<UserData>(SysConfig.StorageKey_UserData);
      if(userinfo!=null)
      {
        this.userInfoData=userinfo;
      }      
  }

  ionViewDidLoad() {}

  logout(){
    this.storageService.remove(SysConfig.StorageKey_UserData);
    this.navCtrl.push(LoginPage);
  }
}

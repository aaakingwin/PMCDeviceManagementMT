import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user/user';
import { StorageService } from '../../providers/storageservice';
import { UserData } from '../../models/userdata';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  msg:MessageService=new MessageService(this.toastCtrl);
  local: Storage;
  loginForm = this.formBuilder.group({
    'LoginID': ['',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userProvider: UserProvider,
    public storageService: StorageService) {}

  ionViewDidLoad() {} 

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let userinfo = new UserData();
    userinfo.LoginID=user.LoginID;
    userinfo.LoginPwd=user.LoginPwd;    
    if(this.userProvider.login(userinfo))
    {
      this.storageService.write(SysConfig.StorageKey_UserInfoData, userinfo);
      this.navCtrl.push(HomePage);
    }
    else
    {
      this.msg.showInfo('用户名或密码错误！');
    }   
  }
  
}

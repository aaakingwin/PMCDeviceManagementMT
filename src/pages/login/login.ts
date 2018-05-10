import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { UserInfoService } from '../../service/userinfoservice';
import { StorageService } from '../../service/storageservice';
import { UserInfoData } from '../../model/userinfodata';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  local: Storage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private userInfoService: UserInfoService,
    private storageService: StorageService) {}
  
  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  loginForm = this.formBuilder.group({
    'LoginID': ['admin',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['123', [Validators.required, Validators.minLength(1)]]
  });

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let userinfo = new UserInfoData();
    userinfo.LoginID=user.LoginID;
    userinfo.LoginPwd=user.LoginPwd;
    if(this.userInfoService.login(userinfo))
    {
      this.storageService.write('UserInfo', userinfo);      
      this.navCtrl.push(TabsPage);
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: '用户名或密码错误！',
        duration: 3000,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: '关闭'
      });
      toast.present();
    }   
  }
  
}

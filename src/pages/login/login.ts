import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user/user';
import { StorageService } from '../../common/storageservice';
import { UserData } from '../../model/userdata';
import { TabsPage } from '../tabs/tabs';
import { SysConfig } from '../../common/sysconfig';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  local: Storage;
  loginForm = this.formBuilder.group({
    'LoginID': ['',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private userProvider: UserProvider,
    private storageService: StorageService) {}

  ionViewDidLoad() {}  

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let userinfo = new UserData();
    userinfo.LoginID=user.LoginID;
    userinfo.LoginPwd=user.LoginPwd;    
    if(this.userProvider.login(userinfo))
    {
      this.storageService.write(SysConfig.StorageKey_UserInfoData, userinfo);
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

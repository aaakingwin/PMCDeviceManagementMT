import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { StorageService } from '../../providers/storageservice';
import { UserData, UserDTO, UserApi } from '../../models/userdata';
import { SysConfig } from '../../providers/sysconfig';
import { MessageService } from '../../providers/messageservice';
import { HomePage } from '../home/home';
import { WebApi } from '../../providers/webapi';

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
    public webApi:WebApi,
    public storageService: StorageService) {}

  ionViewDidLoad() {} 

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let userdata=new UserData();
    userdata.Name=user.LoginID;
    userdata.Password=user.LoginPwd;
    let body=JSON.stringify(userdata);
    this.webApi.post<UserDTO>(UserApi.PostLogin,body).subscribe(res => {
        userdata.Token=res.Data.Token;
        this.storageService.write(SysConfig.StorageKey_UserData, userdata);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.msg.showInfo('用户名或密码错误！');
      }
    );  
  }
  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../providers/storageservice';
import { UserData, UserApi, LoginRequest, UserResponse } from '../../models/userdata';
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
  loginForm = this.formBuilder.group({
    'LoginID': ['',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public webApi:WebApi) {}

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let loginRequest=new LoginRequest();
    loginRequest.UserName=user.LoginID;
    loginRequest.Password=user.LoginPwd;    
    this.webApi.post<UserResponse>(UserApi.PostLogin,loginRequest).subscribe(res => {
      let userdata = new UserData();
      userdata.Token=res.Data.Token;
      userdata.FullName='测试员';
      userdata.Id='D87C2DF5-A46B-487D-9465-E7E77E22175F';
      StorageService.write(SysConfig.StorageKey_UserData, userdata);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }  
}

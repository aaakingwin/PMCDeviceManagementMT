import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData, UserApi, LoginRequest, UserResponse } from '../../models/userdata';
import { MessageService } from '../../providers/messageservice';
import { HomePage } from '../home/home';
import { WebApi } from '../../providers/webapi';
import { UserService } from '../../providers/userservice';
import { SettingPage } from '../setting/setting';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:UserData;
  loginForm = this.formBuilder.group({
    'LoginID': ['',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl: ToastController,public webApi:WebApi) {}

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let loginRequest=new LoginRequest();
    loginRequest.UserName=user.LoginID;
    loginRequest.Password=user.LoginPwd;    
    this.webApi.get<UserResponse>(UserApi.login(loginRequest)).subscribe(res => {
      if(res.Success)
      {
        this.user=res.Data;
        this.user.Password=loginRequest.Password;
        UserService.set(this.user);
        this.navCtrl.setRoot(HomePage);
      }
      else
      {
        MessageService.showInfo(this.toastCtrl,res.Message);
      }
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);
    }); 
  }  

  setup(){
    this.navCtrl.push(SettingPage);
  }  
}

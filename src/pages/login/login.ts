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
  loginForm = this.formBuilder.group({
    'LoginID': ['',  [Validators.required, Validators.minLength(1)]],
    'LoginPwd': ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public webApi:WebApi) {}

  ionViewDidLoad() {} 

  login(user, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    let userdata=new UserData();
    userdata.Name=user.LoginID;
    userdata.Password=user.LoginPwd;    
    this.webApi.post<UserDTO>(UserApi.PostLogin,userdata).subscribe(res => {
      userdata.Token=res.Data.Token;
      StorageService.write(SysConfig.StorageKey_UserData, userdata);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }  
}

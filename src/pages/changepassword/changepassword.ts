import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { MessageService } from '../../providers/messageservice';
import { WebApi } from '../../providers/webapi';
import { UserResponse, UserApi, ChangePasswordRequest, UserData } from '../../models/userdata';
import { UserService } from '../../providers/userservice';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  passwordForm:FormGroup;
  user:UserData;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl: ToastController,public webApi:WebApi) {
    this.passwordForm = this.formBuilder.group({
      'password1': ['',  [Validators.required, Validators.minLength(1)]],
      'password2': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  save(p, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作  
    if(p.password1==p.password2)
    {
      let cpr =new ChangePasswordRequest();
      cpr.Password=p.password1;
      this.webApi.patch<UserResponse>(UserApi.changePassword(UserService.getUserId()),cpr).subscribe(res => {
        if(res.Success)
        {
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
    else
    {
      MessageService.showInfo(this.toastCtrl,'重复密码不匹配');
    }      
  }  

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlService } from '../../providers/urlservice';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  urlForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public toastCtrl:ToastController) {
    this.urlForm = this.formBuilder.group({
      'IP': [UrlService.getIP()],
      'Port': [UrlService.getPort()]
    });
  }

  save(url, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作    
    UrlService.save(url.IP,url.Port);
    MessageService.showInfo(this.toastCtrl,'保存成功');
  }  
}

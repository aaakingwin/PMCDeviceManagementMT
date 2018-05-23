import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { MaintenancesheetProvider } from '../../providers/maintenancesheet/maintenancesheet';
import { MessageService } from '../../providers/messageservice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/userdata';
import { StorageService } from '../../providers/storageservice';

@IonicPage()
@Component({
  selector: 'page-maintenancesheet',
  templateUrl: 'maintenancesheet.html',
})
export class MaintenancesheetPage {
  msg:MessageService=new MessageService(this.toastCtrl);
  item:MaintenancesheetData;
  headingText:string=SysConfig.AppHeadingText;
  maintenanceSheetForm:FormGroup;
  userinfo:UserData;
  applicationDate:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl:ToastController,
    public maintenancesheetProvider:MaintenancesheetProvider,
    public storageService: StorageService) {
      this.item=this.navParams.get('data'); 
      this.userinfo = this.storageService.read<UserData>(SysConfig.StorageKey_UserInfoData);  
      this.userinfo.UserName='abc';
      this.applicationDate= new Date().toLocaleDateString();
      this.maintenanceSheetForm= this.formBuilder.group({
        'applyText1': [this.item.applyText1,  [Validators.required, Validators.minLength(1)]],
        'applyText2': [this.item.applyText2,  [Validators.required, Validators.minLength(1)]],
      });
  }

  ionViewDidLoad() {}

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(this.maintenancesheetProvider.save(this.item))
    {
      this.msg.showInfo('保存成功！');
      this.navCtrl.pop();
    }
    else
    {
      this.msg.showInfo('保存失败！');
    }
  }
}

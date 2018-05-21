import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { MaintenancesheetProvider } from '../../providers/maintenancesheet/maintenancesheet';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-maintenancesheet',
  templateUrl: 'maintenancesheet.html',
})
export class MaintenancesheetPage {
  msg:MessageService=new MessageService(this.toastCtrl);
  item:MaintenancesheetData;
  headingText:string=SysConfig.AppHeadingText;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public maintenancesheetProvider:MaintenancesheetProvider) {
      this.item=this.navParams.get('data');       
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

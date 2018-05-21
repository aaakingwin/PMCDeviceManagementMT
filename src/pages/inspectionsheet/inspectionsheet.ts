import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionsheetData } from '../../models/inspectionsheetdata';
import { InspectionsheetProvider } from '../../providers/inspectionsheet/inspectionsheet';
import { MessageService } from '../../providers/messageservice';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  msg:MessageService=new MessageService(this.toastCtrl);
  headingText:string=SysConfig.AppHeadingText;
  item:InspectionsheetData;
  inspectionSheetForm:FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl:ToastController,
    public inspectionsheetProvider:InspectionsheetProvider) 
  {
    this.item=this.navParams.get('data');  
    this.inspectionSheetForm= this.formBuilder.group({
      'AnomalyDescription': [this.item.AnomalyDescription,  [Validators.required, Validators.minLength(1)]]
    });  
  }

  ionViewDidLoad() {}

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(this.item.DeviceStatus==null)
    {
      this.msg.showInfo('请选择巡检情况！');
    }  
    else
    {
      this.item.AnomalyDescription=data.AnomalyDescription;
      if(this.inspectionsheetProvider.save(this.item))
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
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../common/sysconfig';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionsheetData } from '../../model/inspectionsheetdata';
import { InspectionsheetService } from '../../service/inspectionsheetservice';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  item:InspectionsheetData;
  headingText:string=SysConfig.AppHeadingText;
  inspectionSheetForm:FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private inspectionsheetService:InspectionsheetService) 
  {
    this.item=this.navParams.get('data');  
    this.inspectionSheetForm= this.formBuilder.group({
      'AnomalyDescription': [this.item.AnomalyDescription,  [Validators.required, Validators.minLength(1)]]
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionsheetPage');
  }

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(this.item.DeviceStatus==null)
    {
      alert('请选择巡检情况！');
    }  
    else
    {
      this.item.AnomalyDescription=data.AnomalyDescription;
      if(this.inspectionsheetService.save(this.item))
      {
        alert('保存成功！');
        this.navCtrl.pop();
      }
      else
      {
        alert('保存失败！');
      }
    }
  }
}
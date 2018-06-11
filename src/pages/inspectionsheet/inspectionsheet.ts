import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionsheetData } from '../../models/inspectionsheetdata';
import { MessageService } from '../../providers/messageservice';
import { AssetData } from '../../models/assetdata';
import { WebApi } from '../../providers/webapi';
import { SysConfig } from '../../providers/sysconfig';
import { StorageService } from '../../providers/storageservice';
import { UserData } from '../../models/userdata';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  inspectionsheetData:InspectionsheetData;
  assetData:AssetData
  inspectionSheetForm:FormGroup;
  optType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public webApi:WebApi) 
  {
    this.optType=this.navParams.get('optType');
    this.inspectionsheetData=this.navParams.get('inspectionsheet');
    this.assetData=this.navParams.get('asset');
    if(this.optType==SysConfig.OperationType_See)
    {
     
    }   
    if(this.inspectionsheetData==null)
    {
      let userdata = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
      this.inspectionsheetData=new InspectionsheetData();
      this.inspectionsheetData.Inspector=userdata.FullName;
      this.inspectionsheetData.InspectionDate=new Date().toLocaleDateString();
    }
    if(this.assetData==null)
    {
      this.assetData=new AssetData();
    }
    this.inspectionSheetForm= this.formBuilder.group({
      'Description': [this.inspectionsheetData.Description,  [Validators.required, Validators.minLength(1)]]
    });  
  }

  ionViewDidLoad() 
  {

  }

  save(data, _event) {    
    /* _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
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
    }*/
  }
}

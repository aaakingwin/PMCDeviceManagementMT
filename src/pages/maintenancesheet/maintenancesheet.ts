import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { MaintenanceData, MaintenanceRequest, MaintenanceApi } from '../../models/maintenancedata';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/userdata';
import { StorageService } from '../../providers/storageservice';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { AssetData } from '../../models/assetdata';
import { Verifier } from '../../providers/verifier';
import { MessageService } from '../../providers/messageservice';
import { WebApi } from '../../providers/webapi';

@IonicPage()
@Component({
  selector: 'page-maintenancesheet',
  templateUrl: 'maintenancesheet.html',
})
export class MaintenancesheetPage {
  user:UserData;
  microdistrict:MicrodistrictData;
  maintenanceData:MaintenanceData;
  assetData:AssetData;
  maintenanceSheetForm:FormGroup;
  optType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.optType=this.navParams.get('optType');
    this.maintenanceData=this.navParams.get('maintenance');
    this.assetData=this.navParams.get('asset');
    this.user = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    this.microdistrict= StorageService.read<MicrodistrictData>(SysConfig.StorageKey_SelectedMicrodistrict);
    if(Verifier.isNull(this.maintenanceData))
    {     
      this.maintenanceData=new MaintenanceData();
      this.maintenanceData.RequestUser=this.user.FullName;
      this.maintenanceData.RequestDate=new Date().toLocaleDateString();
    }
    if(Verifier.isNull(this.assetData))
    {
      this.assetData=new AssetData();
    }  
    this.maintenanceSheetForm= this.formBuilder.group({
      'Description': [this.maintenanceData.Description,  [Validators.required, Validators.minLength(1)]]
    });
  }

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作   
    if(Verifier.isNull(data.Description)||data.Description.trim()=='')
    {
      MessageService.showInfo(this.toastCtrl,'请填写情况描述');
      return;
    }    
    let maintenance =new MaintenanceRequest();
    maintenance.MicrodistrictId=this.microdistrict.Id;
    maintenance.RequestUserId=this.user.Id;
    maintenance.AssetId=this.assetData.Id;   
    maintenance.Description=data.Description;
    this.webApi.post(MaintenanceApi.postCreate(),maintenance).subscribe(res => {
      MessageService.showInfo(this.toastCtrl,'保存成功');
      this.navCtrl.pop();
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    });
  }
}

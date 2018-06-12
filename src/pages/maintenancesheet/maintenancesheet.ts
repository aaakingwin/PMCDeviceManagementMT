import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SysConfig } from '../../providers/sysconfig';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/userdata';
import { StorageService } from '../../providers/storageservice';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { AssetStatusData } from '../../models/assetstatusdata';
import { AssetData } from '../../models/assetdata';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-maintenancesheet',
  templateUrl: 'maintenancesheet.html',
})
export class MaintenancesheetPage {
  user:UserData;
  microdistrict:MicrodistrictData;
  assetStatusList:AssetStatusData[];   
  maintenancesheetData:MaintenancesheetData;
  assetData:AssetData;
  assetStatusId:string;
  maintenanceSheetForm:FormGroup;
  optType:string;

  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public storageService: StorageService) {
    this.optType=this.navParams.get('optType');
    this.maintenancesheetData=this.navParams.get('maintenancesheet');
    this.assetData=this.navParams.get('asset');
    this.user = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    this.microdistrict= StorageService.read<MicrodistrictData>(SysConfig.StorageKey_SelectedMicrodistrict);
    this.assetStatusList=StorageService.read<AssetStatusData[]>(SysConfig.StorageKey_AssetStatusList);
    if(Verifier.isNull(this.maintenancesheetData))
    {     
      this.maintenancesheetData=new MaintenancesheetData();
      this.maintenancesheetData.Inspector=this.user.FullName;
      this.maintenancesheetData.InspectionDate=new Date().toLocaleDateString();
    }
    if(Verifier.isNull(this.assetData))
    {
      this.assetData=new AssetData();
    }  
      this.maintenanceSheetForm= this.formBuilder.group({
        'applyText1': [this.maintenancesheetData.AssetName,  [Validators.required, Validators.minLength(1)]],
        'applyText2': [this.maintenancesheetData.AssetName,  [Validators.required, Validators.minLength(1)]],
      });
  }

  save(data, _event) {    
    /* _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(this.maintenancesheetProvider.save(this.item))
    {
      this.msg.showInfo('保存成功！');
      this.navCtrl.pop();
    }
    else
    {
      this.msg.showInfo('保存失败！');
    } */
  }
}

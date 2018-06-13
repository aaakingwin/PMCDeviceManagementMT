import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionsheetData, InspectionsheetApi, InspectionsheetRequest } from '../../models/inspectionsheetdata';
import { MessageService } from '../../providers/messageservice';
import { AssetData } from '../../models/assetdata';
import { WebApi } from '../../providers/webapi';
import { SysConfig } from '../../providers/sysconfig';
import { StorageService } from '../../providers/storageservice';
import { UserData } from '../../models/userdata';
import { AssetStatusData } from '../../models/assetstatusdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { Verifier } from '../../providers/verifier';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  user:UserData;
  microdistrict:MicrodistrictData;
  assetStatusList:AssetStatusData[];   
  inspectionsheetData:InspectionsheetData;
  assetData:AssetData;
  assetStatusId:string;
  inspectionSheetForm:FormGroup;
  optType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.optType=this.navParams.get('optType');
    this.inspectionsheetData=this.navParams.get('inspectionsheet');
    this.assetData=this.navParams.get('asset');
    this.user = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    this.microdistrict= StorageService.read<MicrodistrictData>(SysConfig.StorageKey_SelectedMicrodistrict);
    this.assetStatusList=StorageService.read<AssetStatusData[]>(SysConfig.StorageKey_AssetStatusList);
    if(Verifier.isNull(this.inspectionsheetData))
    {     
      this.inspectionsheetData=new InspectionsheetData();
      this.inspectionsheetData.Inspector=this.user.FullName;
      this.inspectionsheetData.InspectionDate=new Date().toLocaleDateString();
    }
    if(Verifier.isNull(this.assetData))
    {
      this.assetData=new AssetData();
    }  
    this.inspectionSheetForm= this.formBuilder.group({
      'Description': [this.inspectionsheetData.Description,  [Validators.required, Validators.minLength(1)]]
    });
  }

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(Verifier.isNull(this.assetStatusId))
    {
      MessageService.showInfo(this.toastCtrl,'请选择资产状态');
      return;
    }  
    if(Verifier.isNull(data.Description)||data.Description.trim()=='')
    {
      MessageService.showInfo(this.toastCtrl,'请填写情况描述');
      return;
    }    
    let inspection =new InspectionsheetRequest();
    inspection.MicrodistrictId=this.microdistrict.Id;
    inspection.InspectorUserId=this.user.Id;
    inspection.AssetId=this.assetData.Id;
    inspection.AssetStatusId=this.assetStatusId;     
    inspection.Description=data.Description;
    this.webApi.post(InspectionsheetApi.postCreate(),inspection).subscribe(res => {
      MessageService.showInfo(this.toastCtrl,'保存成功');
      this.navCtrl.pop();
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    });      
  }
}

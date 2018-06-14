import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionData, InspectionApi, InspectionRequest } from '../../models/inspectiondata';
import { MessageService } from '../../providers/messageservice';
import { AssetData } from '../../models/assetdata';
import { WebApi } from '../../providers/webapi';
import { SysConfig } from '../../providers/sysconfig';
import { StorageService } from '../../providers/storageservice';
import { UserData } from '../../models/userdata';
import { AssetStatusData } from '../../models/assetstatusdata';
import { MicrodistrictData } from '../../models/microdistrictdata';
import { Verifier } from '../../providers/verifier';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  inspectionData:InspectionData;
  assetData:AssetData;
  user:UserData;
  microdistrict:MicrodistrictData;
  assetStatusList:AssetStatusData[];   
  assetStatusId:string;  
  inspectionSheetForm:FormGroup;
  optType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public webApi:WebApi) {
    this.optType=this.navParams.get('optType');
    this.inspectionData=this.navParams.get('inspection');
    this.assetData=this.navParams.get('asset');
    this.user=UserService.get();
    this.microdistrict= StorageService.read<MicrodistrictData>(SysConfig.StorageKey_SelectedMicrodistrict);
    this.assetStatusList=StorageService.read<AssetStatusData[]>(SysConfig.StorageKey_AssetStatusList);
    if(Verifier.isNull(this.inspectionData))
    {     
      this.inspectionData=new InspectionData();
      this.inspectionData.Inspector=this.user.FullName;
      this.inspectionData.InspectionDate=new Date().toLocaleDateString();
    }
    if(Verifier.isNull(this.assetData))
    {
      this.assetData=new AssetData();
    }  
    this.inspectionSheetForm= this.formBuilder.group({
      'Description': [this.inspectionData.Description,  [Validators.required, Validators.minLength(1)]]
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
    let inspection =new InspectionRequest();
    inspection.MicrodistrictId=this.microdistrict.Id;
    inspection.InspectorUserId=this.user.Id;
    inspection.AssetId=this.assetData.Id;
    inspection.AssetStatusId=this.assetStatusId;     
    inspection.Description=data.Description;
    this.webApi.post(InspectionApi.postCreate(this.user.Id),inspection).subscribe(res => {
      MessageService.showInfo(this.toastCtrl,'保存成功');
      this.navCtrl.pop();
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    });      
  }
}

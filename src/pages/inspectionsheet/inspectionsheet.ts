import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InspectionsheetData, InspectionsheetDTO, InspectionsheetApi } from '../../models/inspectionsheetdata';
import { MessageService } from '../../providers/messageservice';
import { AssetData } from '../../models/assetdata';
import { WebApi } from '../../providers/webapi';
import { SysConfig } from '../../providers/sysconfig';
import { StorageService } from '../../providers/storageservice';
import { UserData } from '../../models/userdata';
import { AssetStatusData, AssetStatusDTO, AssetStatusApi } from '../../models/assetstatusdata';
import { MicrodistrictData } from '../../models/microdistrictdata';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  inspectionsheetData:InspectionsheetData;
  assetData:AssetData;
  assetStatusList:AssetStatusData[];
  assetStatusId:string;
  userdata:UserData;
  microdistrict:MicrodistrictData;
  inspectionSheetForm:FormGroup;
  optType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public formBuilder: FormBuilder,
    public toastCtrl:ToastController,public webApi:WebApi) 
  {
    this.optType=this.navParams.get('optType');
    this.inspectionsheetData=this.navParams.get('inspectionsheet');
    this.assetData=this.navParams.get('asset');
    this.userdata = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    this.microdistrict= StorageService.read<MicrodistrictData>(SysConfig.StorageKey_SelectedMicrodistrict);
    if(this.inspectionsheetData==null)
    {     
      this.inspectionsheetData=new InspectionsheetData();
      this.inspectionsheetData.Inspector=this.userdata.FullName;
      this.inspectionsheetData.InspectionDate=new Date().toLocaleDateString();
    }
    if(this.assetData==null)
    {
      this.assetData=new AssetData();
    }    
    this.inspectionSheetForm= this.formBuilder.group({
      'Description': [this.inspectionsheetData.Description,  [Validators.required, Validators.minLength(1)]]
    });
    this.loadAssetStatusList();  
  }

  ionViewDidLoad() { }

  loadAssetStatusList()
  {
    this.webApi.get<AssetStatusDTO>(AssetStatusApi.GetAll).subscribe(res => {
      this.assetStatusList=res.Data;
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }

  save(data, _event) {    
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    if(this.assetStatusId==null)
    {
      MessageService.showInfo(this.toastCtrl,'请选择资产状态');
    }  
    else
    {   
      let inspection =new InspectionsheetData();
      inspection.MicrodistrictId=this.microdistrict.Id;
      inspection.StaffId="D87C2DF5-A46B-487D-9465-E7E77E22175F";
      inspection.AssetId=this.assetData.Id;
      inspection.AssetStatusId=this.assetStatusId;     
      inspection.Description=data.Description;
      this.webApi.post<InspectionsheetDTO>(InspectionsheetApi.PostCreate+'123456',inspection)
      .subscribe(res => {
        console.log(res);
        this.navCtrl.pop();
      }, error => {
        console.log(error);
        MessageService.showWebApiError(this.toastCtrl,error);  
      });      
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MicrodistrictData, MicrodistrictApi, MicrodistrictResponse } from '../../models/microdistrictdata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { StorageService } from '../../providers/storageservice';
import { SysConfig } from '../../providers/sysconfig';
import { UserService } from '../../providers/userservice';

@IonicPage()
@Component({
  selector: 'page-selectmicrodistrict',
  templateUrl: 'selectmicrodistrict.html',
})
export class SelectmicrodistrictPage {
  callback;//回调函数
  all:MicrodistrictData[];
  items:MicrodistrictData[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public webApi:WebApi) 
  {
    this.callback = this.navParams.get("callback");
    this.loadDataList();
  }

  loadDataList()
  {
    this.webApi.get<MicrodistrictResponse>(MicrodistrictApi.getAll(UserService.getUserId())).subscribe(res=>{
      if(res.Success)
      {
        this.all=res.Data;
        this.items=this.all;
      }
      else
      {
        MessageService.showInfo(this.toastCtrl,res.Message);
      }     
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }

  getItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.all.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) >= 0);
      })
    }
    else
    {
      this.items=this.all;
    }
  }

  openItem(item)
  {
    StorageService.write(SysConfig.StorageKey_SelectedMicrodistrict,item);
    this.callback(item);
  }
}

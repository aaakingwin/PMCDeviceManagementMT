import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MicrodistrictData, MicrodistrictDTO, MicrodistrictApi } from '../../models/microdistrictdata';
import { WebApi } from '../../providers/webapi';
import { MessageService } from '../../providers/messageservice';
import { StorageService } from '../../providers/storageservice';
import { SysConfig } from '../../providers/sysconfig';

@IonicPage()
@Component({
  selector: 'page-selectmicrodistrict',
  templateUrl: 'selectmicrodistrict.html',
})
export class SelectmicrodistrictPage {
  callback;//回调函数
  microdistrictlist:MicrodistrictData[];
  items:MicrodistrictData[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public webApi:WebApi) 
  {
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    this.loadMicrodistrictList();
  }

  loadMicrodistrictList()
  {
    this.webApi.get<MicrodistrictDTO>(MicrodistrictApi.GetAll).subscribe(res=>{
      this.microdistrictlist=res.Data;
      this.items=this.microdistrictlist;
    }, error => {
      MessageService.showWebApiError(this.toastCtrl,error);  
    }); 
  }

  getItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.microdistrictlist.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) >= 0);
      })
    }
    else
    {
      this.items=this.microdistrictlist;
    }
  }

  openItem(item)
  {
    StorageService.write(SysConfig.StorageKey_SelectedMicrodistrict,item);
    this.callback(item);
  }
}

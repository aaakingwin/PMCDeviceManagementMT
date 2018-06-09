import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetlistPage } from '../assetlist/assetlist';
import { SettingPage } from '../setting/setting';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      {title: '资产清单', component: AssetlistPage},
      {title: '系统设置', component: SettingPage}
    ];
  }

  ionViewDidLoad() {}

  openPage(page) {    
    this.navCtrl.setRoot(page.component);
  }
}

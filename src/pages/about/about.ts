import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/userservice';
import { AppInfoService } from '../../providers/appinfoservice';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  versionCode: string;
  fullname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fullname = UserService.getFullName();
    this.versionCode = AppInfoService.getVersionCode();
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysConfig } from '../../common/sysconfig';

@IonicPage()
@Component({
  selector: 'page-inspectionsheet',
  templateUrl: 'inspectionsheet.html',
})
export class InspectionsheetPage {
  headingText:string=SysConfig.AppHeadingText;
  deviceName:string;
  address:string;
  installationPosition:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var data=this.navParams.get('data');  
    this.deviceName=data.DeviceName;
    this.address=data.Address;  
    this.installationPosition=data.InstallationPosition;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionsheetPage');
  }

}

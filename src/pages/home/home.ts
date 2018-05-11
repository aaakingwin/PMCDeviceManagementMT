import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  qrtext:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.qrtext = this.navParams.get('qrvalue');    
  }

  scan() {
    this.navCtrl.push('ScanPage');
  } 
}

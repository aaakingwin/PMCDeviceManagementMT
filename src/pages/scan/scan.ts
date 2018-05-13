import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  light: boolean;//闪光灯
  frontCamera: boolean;//摄像头
  callback;//回调函数

  constructor(
    private navParams:NavParams,
    private qrScanner: QRScanner) {
      this.light = false;
      this.frontCamera = false;
      this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) 
        {
          //显示摄像头
          this.qrScanner.show();
          //开始扫描
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {    
            scanSub.unsubscribe();//停止扫描           
            this.callback(text);//回传扫描结果                    
          });
        } 
        else if (status.denied) {this.qrScanner.openSettings();} 
        else {}
      })
      .catch((e: any) => console.log('Error is', e));
  } 

  toggleLight() {
    //闪光灯控制，默认关闭
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }
 
  toggleCamera() {
     //前后摄像头互换
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {    
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
  ionViewDidEnter(){
    this.showCamera();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }
}

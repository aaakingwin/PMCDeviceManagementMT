import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserData, LoginRequest, UserResponse, UserApi } from '../models/userdata';
import { SysConfig } from '../providers/sysconfig';
import { AssetlistPage } from '../pages/assetlist/assetlist';
import { HomePage } from '../pages/home/home';
import { AssetinspectionPage } from '../pages/assetinspection/assetinspection';
import { AssetmaintenancePage } from '../pages/assetmaintenance/assetmaintenance';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { Verifier } from '../providers/verifier';
import { WebApi } from '../providers/webapi';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { AppVersion } from '@ionic-native/app-version';
import { UserService } from '../providers/userservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  
  rootPage: any;
  user:UserData;
  vcode:string;
  pages: Array<{title: string, component: any}>=[
    {title: '首页', component: HomePage },
    {title: '巡检', component: AssetinspectionPage},
    {title: '维保', component: AssetmaintenancePage},
    {title: '巡检记录', component: InspectionlistPage},
    {title: '维保记录', component: MaintenancelistPage},
    {title: '资产', component: AssetlistPage}
  ];    
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public alertCtrl: AlertController,
    public webApi:WebApi,public transfer: FileTransfer,public appVersion: AppVersion,public file: File,public fileOpener: FileOpener) {      
      if(this.isOldVersion())
      {
        this.upgrade();
      }
      else
      {
        this.initializeApp();
        this.user=UserService.get();
        this.login();
      }    
  }

  login()
  {
    if(!Verifier.isNull(this.user))
    {
      let loginRequest=new LoginRequest();
      loginRequest.UserName=this.user.Name;
      loginRequest.Password=this.user.Password;    
      this.webApi.post<UserResponse>(UserApi.postLogin(),loginRequest).subscribe(res => {
        this.user=res.Data;
        this.user.Password=loginRequest.Password;
        UserService.set(this.user);
        this.rootPage=HomePage;
      }, error => {
        this.rootPage=LoginPage;
      }); 
    }
    else
    {
      this.rootPage=LoginPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  //是否是老版
  isOldVersion():boolean
  {
      return false;
     /*  this.appVersion.getVersionCode().then(code=> {
          this.vcode = code;
      });   */    
  }
  //升级
  upgrade() {      
      this.alertCtrl.create({
        title: '升级',
        subTitle: '发现新版本,是否立即升级？',
        buttons: [
          { 
            text: '取消'
          },
          {
            text: '确定',
            handler: () => {
              this.downloadApp();
            }
          }
        ]
      }).present();      
  }   
  //下载安装app
  downloadApp() {
    if (this.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false
      });
      alert.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalRootDirectory + SysConfig.ApkName; 
      fileTransfer.download(SysConfig.AppUpdateUrl, apk).then(() => {
        this.fileOpener.open(apk,'application/vnd.android.package-archive');
      });
      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
  }
  //是否真机环境
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }
  //是否android真机环境
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }
  //是否ios真机环境
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
}


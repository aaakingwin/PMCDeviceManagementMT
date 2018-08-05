import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, AlertController, ToastController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserData, LoginRequest, UserResponse, UserApi } from '../models/userdata';
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
import { AboutPage } from '../pages/about/about';
import { AppVersionData, AppVersionApi, AppVersionResponse } from '../models/appversiondata';
import { StorageService } from '../providers/storageservice';
import { SysConfig } from '../providers/sysconfig';
import { MessageService } from '../providers/messageservice';
import { SettingPage } from '../pages/setting/setting';
import { UrlService } from '../providers/urlservice';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  
  rootPage: any;
  user: UserData;
  version: AppVersionData;
  pages: Array<{title: string, component: any, img: string}>=[
    {title: '首页', component: HomePage ,img: 'home.png'},
    {title: '常规巡检', component: AssetinspectionPage ,img: 'inspection.png'},
    {title: '维保申请', component: AssetmaintenancePage ,img: 'microdistrict.png'},
    {title: '巡检记录', component: InspectionlistPage ,img: 'inspectionrecord.png'},
    {title: '维保记录', component: MaintenancelistPage ,img: 'microdistrictrecord.png'},
    {title: '资产', component: AssetlistPage ,img: 'asset.png'},
    {title: '修改密码', component: ChangepasswordPage ,img: 'changepassword.png'},
    {title: '设置', component: SettingPage ,img: 'setting.png'},
    {title: '关于', component: AboutPage ,img: 'about.png'}
  ];    
  constructor(public appCtrl: App,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public alertCtrl: AlertController,public toastCtrl:ToastController,public webApi:WebApi,public transfer: FileTransfer,
    public appVersion: AppVersion,public file: File,public fileOpener: FileOpener) {      
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.registerBackButtonAction();//注册返回按键事件
      });
      this.user=UserService.get();//加载本地用户          
      if(this.isWeb())
      {
        this.login();
      }
      else
      {
        this.webApi.get<AppVersionResponse>(AppVersionApi.getLast()).subscribe(res => { 
          if(res.Success)
          {
            this.version = res.Data;         
            this.appVersion.getVersionCode().then(code=> {
              if(this.version.Version==code)
              {     
                StorageService.write(SysConfig.StorageKey_AppVersion,this.version);       
                this.login();
              }
              else
              {
                this.upgrade();
              }             
            }); 
          }
          else
          {
            MessageService.showInfo(this.toastCtrl,res.Message);
            this.login();
          }        
        }, error => {
          MessageService.showWebApiError(this.toastCtrl,error);  
          this.login();
        });
      }
  }

  //登录
  login()
  {
    if(!Verifier.isNull(this.user))
    {
      let loginRequest=new LoginRequest();
      loginRequest.UserName=this.user.Name;
      loginRequest.Password=this.user.Password; 
      this.webApi.get<UserResponse>(UserApi.login(loginRequest)).subscribe(res => {
        if(res.Success)
        {
          this.user=res.Data;
          this.user.Password=loginRequest.Password;
          UserService.set(this.user);
          this.rootPage=HomePage;
        }
        else
        {
          this.rootPage=LoginPage;
        }        
      }, error => {
        this.rootPage=LoginPage;
      }); 
    }
    else
    {
      this.rootPage=LoginPage;
    }
  }

  //菜单按钮事件
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  //注册返回按钮事件
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //控制modal、系统自带提示框
      let overlay = this.appCtrl._appRoot._overlayPortal.getActive() || this.appCtrl._appRoot._modalPortal.getActive();
      if (overlay) {
        overlay.dismiss();
        return;
      }
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      for (let p of this.pages) {
        if(page instanceof p.component)
        {
          return this.showExit();
        }
      }
      if (page instanceof LoginPage) {
        return this.showExit();
      }
      this.appCtrl.getActiveNav().pop();//剩余的情况全部使用全局路由进行操作 
    });
  }

  //退出提示框
  showExit() {
    this.alertCtrl.create({
      subTitle: '是否确定要退出？',
      buttons: [
        { 
          text: '取消'
        },
        {
          text: '确定',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    }).present();      
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
      const apk = this.file.externalRootDirectory + this.version.Name +'.apk'; 
      fileTransfer.download(UrlService.getUrl() + this.version.ServerPath, apk).then(() => {
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

  //是否网页形式
  isWeb():boolean
  {
    if(!this.isAndroid() && !this.isIos())
    {
      return true;
    }
    else
    {
      return false;
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


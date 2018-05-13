import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';

import { MyApp } from './app.component';

import { UserInfoService } from '../service/userinfoservice';
import { StorageService } from '../service/storageservice';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { SettingPage } from '../pages/setting/setting';
import { InspectionsheetPage } from '../pages/inspectionsheet/inspectionsheet';
import { InspectionsheetService } from '../service/inspectionsheetservice';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    SettingPage
  ],
  providers: [
    StorageService,
    UserInfoService,
    InspectionsheetService,
    QRScanner,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

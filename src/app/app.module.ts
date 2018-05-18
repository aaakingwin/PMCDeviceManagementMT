import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { StorageService } from '../providers/storageservice';
import { UserProvider } from '../providers/user/user';
import { InspectionsheetProvider } from '../providers/inspectionsheet/inspectionsheet';
import { MaintenancesheetProvider } from '../providers/maintenancesheet/maintenancesheet';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { SettingPage } from '../pages/setting/setting';
import { InspectionsheetPage } from '../pages/inspectionsheet/inspectionsheet';
import { MaintenancesheetPage } from '../pages/maintenancesheet/maintenancesheet';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    MaintenancesheetPage,
    SettingPage
  ],
  imports: [
    HttpClientModule,
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
    MaintenancesheetPage,
    SettingPage
  ],
  providers: [
    QRScanner,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    UserProvider,
    InspectionsheetProvider,
    MaintenancesheetProvider
  ]
})
export class AppModule {}

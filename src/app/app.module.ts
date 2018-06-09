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
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { SettingPage } from '../pages/setting/setting';
import { InspectionsheetPage } from '../pages/inspectionsheet/inspectionsheet';
import { MaintenancesheetPage } from '../pages/maintenancesheet/maintenancesheet';
import { AssetPage } from '../pages/asset/asset';
import { AssetlistPage } from '../pages/assetlist/assetlist';
import { PipesModule } from '../pipes/pipes.module';
import { WebApi } from '../providers/webapi';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    MaintenancesheetPage,
    AssetlistPage,
    AssetPage,
    SettingPage
  ],
  imports: [
    PipesModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    MaintenancesheetPage,
    AssetlistPage,
    AssetPage,
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
    MaintenancesheetProvider,
    WebApi,
  ]
})
export class AppModule {}

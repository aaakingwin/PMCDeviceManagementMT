import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { StorageService } from '../providers/storageservice';
import { LoginPage } from '../pages/login/login';
import { InspectionlistPage } from '../pages/inspectionlist/inspectionlist';
import { MaintenancelistPage } from '../pages/maintenancelist/maintenancelist';
import { InspectionsheetPage } from '../pages/inspectionsheet/inspectionsheet';
import { MaintenancesheetPage } from '../pages/maintenancesheet/maintenancesheet';
import { AssetPage } from '../pages/asset/asset';
import { AssetlistPage } from '../pages/assetlist/assetlist';
import { PipesModule } from '../pipes/pipes.module';
import { WebApi } from '../providers/webapi';
import { HomePage } from '../pages/home/home';
import { SelectmicrodistrictPage } from '../pages/selectmicrodistrict/selectmicrodistrict';
import { AssetinspectionPage } from '../pages/assetinspection/assetinspection';
import { AssetmaintenancePage } from '../pages/assetmaintenance/assetmaintenance';
import { MessageService } from '../providers/messageservice';
import { AssetinspectionrecordPage } from '../pages/assetinspectionrecord/assetinspectionrecord';
import { AssetmaintenancerecordPage } from '../pages/assetmaintenancerecord/assetmaintenancerecord';
import { Verifier } from '../providers/verifier';
import { Converter } from '../providers/converter';
import { AppVersion } from '@ionic-native/app-version';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InspectionlistPage,
    InspectionsheetPage,
    MaintenancelistPage,
    MaintenancesheetPage,
    AssetinspectionPage,
    AssetmaintenancePage,
    AssetinspectionrecordPage,
    AssetmaintenancerecordPage,
    AssetlistPage,
    AssetPage,
    AboutPage,
    SelectmicrodistrictPage
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
    AssetinspectionPage,
    AssetmaintenancePage,
    AssetinspectionrecordPage,
    AssetmaintenancerecordPage,
    AssetlistPage,
    AssetPage,
    AboutPage,
    SelectmicrodistrictPage
  ],
  providers: [
    QRScanner,
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    FileOpener,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    MessageService,
    WebApi,
    Converter,
    Verifier
  ]
})
export class AppModule {}

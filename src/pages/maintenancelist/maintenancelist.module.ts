import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenancelistPage } from './maintenancelist';

@NgModule({
  declarations: [
    MaintenancelistPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenancelistPage),
  ],
})
export class MaintenancelistPageModule {}

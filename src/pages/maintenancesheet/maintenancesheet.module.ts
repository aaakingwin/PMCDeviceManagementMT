import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenancesheetPage } from './maintenancesheet';

@NgModule({
  declarations: [
    MaintenancesheetPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenancesheetPage),
  ],
})
export class MaintenancesheetPageModule {}

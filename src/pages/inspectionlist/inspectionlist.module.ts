import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionlistPage } from './inspectionlist';

@NgModule({
  declarations: [
    InspectionlistPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectionlistPage),
  ],
})
export class InspectionlistPageModule {}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenancesheetData } from '../../models/maintenancesheetdata';

@Injectable()
export class MaintenancesheetProvider {

  constructor(public http: HttpClient) {}

  getDataList():Array<MaintenancesheetData>
  {
    let data1=new MaintenancesheetData();
    data1.DeviceName='海康监控器';
    data1.Address='世纪园';        
    let data2=new MaintenancesheetData();
    data2.DeviceName='路由器';
    data2.Address='万达';        
    let data3=new MaintenancesheetData();
    data3.DeviceName='电梯';
    data3.Address='滨河花园';        
    let list = [data1,data2,data3];
    return list;
  }

  save(data:MaintenancesheetData):boolean
  {
      return true;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InspectionsheetData } from "../../models/inspectionsheetdata";

@Injectable()
export class InspectionsheetProvider {

  constructor(public http: HttpClient) {}

  convertToData(jsonText:string):InspectionsheetData
  {
      var temp = JSON.parse(jsonText);
      if(temp.DeviceName!=null)
      {      
          let data=new InspectionsheetData;
          data.DeviceName=temp.DeviceName;
          data.Address=temp.Address;
          data.InstallationPosition=temp.InstallationPosition;
          return data;
      }
      else
      {
          return null;
      }    
  }

  getDataList():Array<InspectionsheetData>
  {
      let data1=new InspectionsheetData();
      data1.DeviceName='海康监控器';
      data1.Address='世纪园';        
      data1.InstallationPosition='监控室'
      data1.DeviceStatus='正常';
      data1.StatusImg='yes';
      data1.AnomalyDescription='abc';
      let data2=new InspectionsheetData();
      data2.DeviceName='路由器';
      data2.Address='万达';        
      data2.InstallationPosition='机房'
      data2.DeviceStatus='丢失';
      data2.StatusImg='no';
      data2.AnomalyDescription='qwe';
      let data3=new InspectionsheetData();
      data3.DeviceName='电梯';
      data3.Address='滨河花园';        
      data3.InstallationPosition='5#'
      data3.DeviceStatus='异常';
      data3.StatusImg='no';
      data3.AnomalyDescription='fds';
      let list = [data1,data2,data3];
      return list;
  }

  save(data:InspectionsheetData):boolean
  {
      return true;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InspectionsheetData } from "../../model/inspectionsheetdata";

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

  getInspectionsheetList():Array<InspectionsheetData>
  {
      let isd1=new InspectionsheetData();
      isd1.DeviceName='海康监控器';
      isd1.Address='世纪园';        
      isd1.InstallationPosition='监控室'
      isd1.DeviceStatus='正常';
      isd1.StatusImg='yes';
      isd1.AnomalyDescription='abc';
      let isd2=new InspectionsheetData();
      isd2.DeviceName='路由器';
      isd2.Address='万达';        
      isd2.InstallationPosition='机房'
      isd2.DeviceStatus='丢失';
      isd2.StatusImg='no';
      isd2.AnomalyDescription='qwe';
      let isd3=new InspectionsheetData();
      isd3.DeviceName='电梯';
      isd3.Address='滨河花园';        
      isd3.InstallationPosition='5#'
      isd3.DeviceStatus='异常';
      isd3.StatusImg='no';
      isd3.AnomalyDescription='fds';
      let list = [isd1,isd2,isd3];
      return list;
  }

  save(data:InspectionsheetData):boolean
  {
      return true;
  }
}

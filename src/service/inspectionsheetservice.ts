import { InspectionsheetData } from "../model/inspectionsheetdata";

export class InspectionsheetService
{
    constructor() { }

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
}
import { SysConfig } from "../providers/sysconfig";

export class MaintenanceData
{
    Id:string;    
    Microdistrict:string;   
    RequestDate:string;  
    RequestUser:string; 
    ConfirmDate:string;
    ConfirmUser:string;
    Status:string;
    AssetNumber:string;
    AssetName:string;
    Description:string;
}

export class MaintenanceResponse
{
    Data:any;
    Success:boolean;
    Message:string;
    Count:number;
}

export class MaintenanceRequest
{
    MicrodistrictId:string;
	RequestUserId:string;
	AssetId:string;
	Description:string;
}

export class MaintenanceApi
{
    static getMultipleByAssetId(id:string)
    {
        return SysConfig.WebApi_Maintenance+SysConfig.WebApi_GetMultiple+'type=assetid&assetid='+id;
    }
    static getMultipleByRequestDate(date:string)
    {
        return SysConfig.WebApi_Maintenance+SysConfig.WebApi_GetMultiple+'type=requestdate&requestdate='+date;
    }
    static getSingleById(id:string)
    {
        return SysConfig.WebApi_Maintenance+SysConfig.WebApi_GetSingle+'id='+id;
    }
    static postCreate()
    {
        return SysConfig.WebApi_Maintenance+SysConfig.WebApi_PostCreate+'token='+'token';
    }
}
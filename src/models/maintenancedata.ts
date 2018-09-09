import { SysConfig } from "../providers/sysconfig";

export class MaintenanceData
{
    Id:string;   
    Status:string; 
    Microdistrict:string;   
    AssetNumber:string;
    AssetName:string;
    AppliedDate:string;  
    AppliedUser:string; 
    AppliedDescription:string;
    ConfirmedDate:string;
    ConfirmedUser:string;
    ConfirmedDescription:string;
    ClosedDate:string;
    ClosedUser:string;
    ClosedDescription:string;
}

export class MaintenanceResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class MaintenanceRequest
{
	AssetId:string;
	Description:string;
}

export class MaintenanceApi
{
    static getDataByAssetId(userid:string,assetid:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_Multiple + SysConfig.WebApi_Param_User + userid 
        + '&assetid=' + assetid;
    }
    static getDataByApplicationDate(userid:string,bod:string,eod:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_Multiple + SysConfig.WebApi_Param_User + userid 
        + '&bod=' + bod + '&eod=' +eod;
    }
    static getDataById(userid:string,id:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_Single + SysConfig.WebApi_Param_User + userid 
        + '&id=' + id;
    }
    static postCreate(userid:string,)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Post_Create + SysConfig.WebApi_Param_User + userid;
    }
}
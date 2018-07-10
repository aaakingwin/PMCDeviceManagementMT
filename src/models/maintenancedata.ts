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
    MicrodistrictId:string;
	ApplicationUserId:string;
	AssetId:string;
	Description:string;
}

export class MaintenanceApi
{
    static getDataByAssetId(userid:string,assetid:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_View + SysConfig.WebApi_Param_User + userid 
        + '&type=assetid&assetid=' + assetid;
    }
    static getDataByApplicationDate(userid:string,applieddate:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_View + SysConfig.WebApi_Param_User + userid 
        + '&type=applieddate&applieddate=' + applieddate;
    }
    static getDataById(userid:string,id:string)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Get_View + SysConfig.WebApi_Param_User + userid 
        + '&id=' + id;
    }
    static postCreate(userid:string,)
    {
        return SysConfig.WebApi_Module_Maintenance + SysConfig.WebApi_Post_Create + SysConfig.WebApi_Param_User + userid;
    }
}
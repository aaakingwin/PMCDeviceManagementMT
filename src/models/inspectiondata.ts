import { SysConfig } from "../providers/sysconfig";

export class InspectionData
{
    Id:string;
    InspectionDate:string; 
    Microdistrict:string;   
    Inspector:string;  
    AssetNumber:string;
    AssetName:string;
    AssetStatus:string;
    Description:string;  
}

export class InspectionResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class InspectionRequest
{
    MicrodistrictId:string;
    InspectorUserId:string;
    AssetId:string;
    AssetStatusId:string;
    Description:string;
}

export class InspectionApi
{
    static getDataByAssetId(userid:string,assetid:string)
    {
        return SysConfig.WebApi_Module_Inspection + SysConfig.WebApi_Get_Multiple + SysConfig.WebApi_Param_User + userid 
        + '&assetid=' + assetid;
    }
    static getDataByInspectionDate(userid:string,bod:string,eod:string)
    {
        return SysConfig.WebApi_Module_Inspection + SysConfig.WebApi_Get_Multiple + SysConfig.WebApi_Param_User + userid  
        + '&bod=' + bod + '&eod=' +eod;
    }
    static getDataById(userid:string,id:string)
    {
        return SysConfig.WebApi_Module_Inspection + SysConfig.WebApi_Get_Single + SysConfig.WebApi_Param_User + userid  
        + '&id=' + id;
    }
    static postCreate(userid:string)
    {
        return SysConfig.WebApi_Module_Inspection + SysConfig.WebApi_Post_Create + SysConfig.WebApi_Param_User + userid;
    }
}
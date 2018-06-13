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
    Count:number;
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
    static getMultipleByAssetId(id:string)
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_GetMultiple+'type=assetid&assetid='+id;
    }
    static getMultipleByInspectionDate(date:string)
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_GetMultiple+'type=inspectiondate&inspectiondate='+date;
    }
    static getSingleById(id:string)
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_GetSingle+'id='+id;
    }
    static postCreate()
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_PostCreate+'token='+'token';
    }
}
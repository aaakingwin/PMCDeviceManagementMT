import { SysConfig } from "../providers/sysconfig";

export class InspectionsheetData
{
    Id:string;
    InspectionDate:string; 
    MicrodistrictId:string;  
    Microdistrict:string;   
    InspectorUserId:string; 
    Inspector:string;  
    AssetId:string; 
    AssetNumber:string;
    AssetName:string;
    AssetStatusId:string;
    AssetStatus:string;
    Description:string;  
}

export class InspectionsheetResponse
{
    Data:any;
    Success:boolean;
    Message:string;
    Count:number;
}

export class InspectionsheetRequest
{
    MicrodistrictId:string;
    InspectorUserId:string;
    AssetId:string;
    AssetStatusId:string;
    Description:string;
}

export class InspectionsheetApi
{
    static getMultipleByAssetId(id:string)
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_GetMultiple+'type=assetid&assetid='+id;
    }
    static getMultipleByInspectionDate(idate:string)
    {
        return SysConfig.WebApi_Inspection+SysConfig.WebApi_GetMultiple+'type=inspectiondate&inspectiondate='+idate;
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
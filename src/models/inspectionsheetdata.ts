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
    static readonly GetMultipleByAssetId='inspection/multiple?type=assetid&assetid=';
    static readonly GetMultipleByInspectiondate='inspection/multiple?type=inspectiondate&inspectiondate=';
    static readonly GetSingleById='inspection/single?id=';     
    static readonly PostCreate='inspection/create?token=';
}
export class InspectionsheetData
{
    Id:string;
    InspectionDate:string;   
    Microdistrict:string;    
    Inspector:string;   
    AssetNumber:string;
    AssetName:string;
    AssetStatus:string;
    Description:string;
    MicrodistrictId:string;
    StaffId:string;
    AssetId:string;
    AssetStatusId:string;
}

export class InspectionsheetDTO
{
    Data:InspectionsheetData[];
    Success:boolean;
    Message:string;
    Count:number;
}

export class InspectionsheetApi
{
    static readonly GetMultipleByAssetId='inspection/multiple?type=assetid&assetid=';
    static readonly GetSingleById='inspection/single?id=';
    static readonly PostCreate='inspection/create?token=';
}
import { SysConfig } from "../providers/sysconfig";
//巡检单数据
export class InspectionData
{
    Id:string;
    InspectionDate:string; //巡检日期
    Microdistrict:string;   //所属小区
    Inspector:string;  //巡检人员
    AssetNumber:string;//物品代码
    AssetName:string;//物品名称
    AssetStatus:string;//物品状态
    Description:string;  //情况描述
    Department:string;	//部门科室
    Township:string;	//所属区镇
    Community:string;	//所属社区
    AssetCategory:string;	//物品总类
    AssetType:string;	//物品类型
    AssetGroup:string;	//物品分组	
}

export class InspectionResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class InspectionRequest
{   
    AssetId:string;
    AssetStatusId:number;
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
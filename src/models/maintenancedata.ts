import { SysConfig } from "../providers/sysconfig";
//维保单数据
export class MaintenanceData
{
    Id:string;   
    Status:string; //申请状态
    Microdistrict:string;   //所属小区
    AssetNumber:string;//物品代码
    AssetName:string;//物品名称
    AppliedDate:string;//申请日期
    AppliedUser:string; //申请人员
    AppliedDescription:string;//申请描述
    ConfirmedDate:string;//确认日期
    ConfirmedUser:string;//确认人员
    ConfirmedDescription:string;//确认描述
    ClosedDate:string;//关闭日期
    ClosedUser:string;//关闭人员
    ClosedDescription:string;//关闭描述	
    Department:string;	//部门科室
    Township:string;	//所属区镇
    Community:string;	//所属社区
    AssetCategory:string;	//物品总类
    AssetType:string;	//物品类型
    AssetGroup:string;	//物品分组		
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
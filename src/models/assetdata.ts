import { SysConfig } from "../providers/sysconfig";

//资产数据类
export class AssetData{
    Id:string;//唯一码
    AssetType:string;//资产类型
    AssetGroup:string;//资产分组
    AssetStatus:string;//资产状态
    Number:string;//资产编号
    Name:string;//资产名称
    Brand:string;//品牌
    Model:string;//资产型号
    Manufacturer:string;//制造商
    Supplier:string;//供应商
    Description:string;//描述
    Microdistrict:string;//小区
    AssetLocation:string;//应用地点
    PowerLocation:string;//电箱地点
    InstallLocation:string;//安装地点
    Remark:string;//备注
    LastInspectionTime:string;//最后巡检时间
    LastRepairApplicationTime:string;//最后维保时间
    IsDisabled:boolean;//是否禁用
}
//资产传输对象
export class AssetResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}
//资产API
export class AssetApi
{    
    static getDataByMicrodistrictId(userid:string,microdistrictid:string)
    {
        return  SysConfig.WebApi_Module_Asset + SysConfig.WebApi_Get_Multiple + SysConfig.WebApi_Param_User + userid 
        + '&microdistrictid=' + microdistrictid;
    }

    static getDataByNumber(userid:string,number:string)
    {
        return  SysConfig.WebApi_Module_Asset + SysConfig.WebApi_Get_Scan + SysConfig.WebApi_Param_User + userid 
        +'&number=' + number;
    }
}
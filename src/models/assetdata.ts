import { SysConfig } from "../providers/sysconfig";

//资产数据类
export class AssetData{
    Id:string;//唯一码
    AssetType:string;//资产类型
    Number:string;//资产编码
    Name:string;//资产名称
    Brand:string;//品牌
    Model:string;//资产型号
    Manufacturer:string;//制造商
    Description:string;//描述
    Microdistrict:string;//小区
    AssetLocation:string;//应用地点
    PowerLocation:string;//电箱地点
    InstallLocation:string;//安装地点
    Remark:string;//备注
    IsDisabled:boolean;//是否禁用
    CreatedTime:string;//创建时间
    LastModifyedTime:string;//最后修改时间
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
        return  SysConfig.WebApi_Module_Asset + SysConfig.WebApi_Get_View + SysConfig.WebApi_Param_User + userid 
        + '&type=microdistrictid&microdistrictid=' + microdistrictid;
    }

    static getDataByNumber(userid:string,number:string)
    {
        return  SysConfig.WebApi_Module_Asset + SysConfig.WebApi_Get_Scan + SysConfig.WebApi_Param_User + userid 
        +'&number=' + number;
    }
}
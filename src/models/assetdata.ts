import { SysConfig } from "../providers/sysconfig";

//资产数据类
export class AssetData{
    Id:string;//唯一码   
    AssetStatus:string; //物品状态
    Department:string;	//部门科室
    Township:string;	//所属区镇
    Community:string;	//所属社区
    Microdistrict:string;	//所属小区
    ResponsiblePerson:string;	//责任人员
    AssetCategory:string;	//物品总类
    AssetType:string;	//物品类型
    AssetGroup:string;	//物品分组
    Number:string;	//物品代码
    Name:string;	//物品名称
    Brand:string;	//物品品牌
    Model:string;	//规格型号
    Description:string;	//物品描述
    Warranty:string;	//质保期限
    Supplier:string;	//供应厂商
    AssetLocation:string;	//物品位置
    InstallLocation:string;	//安装位置
    PowerLocation:string;	//供电位置
    Remark:string;	//备注信息
    LastInspectionTime:string;	//巡检日期
    LastRepairApplicationTime:string;	//维保日期
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
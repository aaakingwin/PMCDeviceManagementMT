import { SysConfig } from "../providers/sysconfig";

export class AssetStatusData
{
    Id:string;
    Name:string;
}

export class AssetStatusResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class AssetStatusApi
{
    static getAll(userid:string)
    {
        return SysConfig.WebApi_Module_AssetStatus + SysConfig.WebApi_Get_View  + SysConfig.WebApi_Param_User + userid 
        + '&type=all';
    }
}
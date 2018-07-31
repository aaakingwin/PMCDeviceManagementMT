import { SysConfig } from "../providers/sysconfig";

export class MicrodistrictData
{
    Id:string;
    Name:string;
    Address:string;
    PropertyManagementCompany:string;
}

export class MicrodistrictResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class MicrodistrictApi
{
    static getAll(userid:string)
    {
        return SysConfig.WebApi_Module_Microdistrict + SysConfig.WebApi_Get_All + SysConfig.WebApi_Param_User + userid;
    }
}
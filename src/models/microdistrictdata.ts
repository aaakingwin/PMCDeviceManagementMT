import { SysConfig } from "../providers/sysconfig";

export class MicrodistrictData
{
    Id:string;
    Name:string;
    Address:string;
    PropertyManagementCompany:string;
    CreatedTime:string;
    LastModifyedTime:string;
}

export class MicrodistrictResponse
{
    Data:any;
    Success:boolean;
    Message:string;
    Count:number;
}

export class MicrodistrictApi
{
    static getAll()
    {
        return SysConfig.WebApi_Microdistrict+SysConfig.WebApi_GetAll;
    }
}
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
    Count:number;
}

export class AssetStatusApi
{
    static getAll()
    {
        return SysConfig.WebApi_AssetStatus+SysConfig.WebApi_GetAll;
    }
}
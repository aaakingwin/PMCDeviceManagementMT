import { SysConfig } from "../providers/sysconfig";

export class AppVersionData
{
    Id:string;
    Version:string;
    Name: string; 
    ServerPath: string;
}

export class AppVersionResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class AppVersionApi
{    
    static getLast()
    {
        return  SysConfig.WebApi_Module_AppVersion + SysConfig.WebApi_Get_View
        + 'type=last';
    }
}
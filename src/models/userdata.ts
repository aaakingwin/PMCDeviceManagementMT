import { SysConfig } from "../providers/sysconfig";

export class UserData {
    Id:string;
    Name:string;
    Password:string;
    FullName:string;
    Telephone:string;
    EquipmentIdentity:string;
}

export class UserResponse
{
    Data:any;
    Success:boolean;
    Message:string;
}

export class LoginRequest
{
    UserName:string;
    Password:string;
}

export class UserApi{

    static postLogin()
    {
        return SysConfig.WebApi_Module_Authentication + SysConfig.WebApi_Post_Login;
    }
}
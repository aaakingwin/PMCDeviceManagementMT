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

export class ChangePasswordRequest
{
    Password:string;
}

export class UserApi{

    static login(lr:LoginRequest)
    {
        return SysConfig.WebApi_Module_Authentication + SysConfig.WebApi_Get_Signin
        + 'username=' + lr.UserName + '&password=' + lr.Password;
    }

    static changePassword(userid:string)
    {
        return SysConfig.WebApi_Module_User + SysConfig.WebApi_Patch_ChangePassword + SysConfig.WebApi_Param_User + userid
        + '&id=' + userid;
    }
}
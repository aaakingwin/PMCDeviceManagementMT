import { StorageService } from "./storageservice";
import { UserData } from "../models/userdata";
import { SysConfig } from "./sysconfig";
import { Verifier } from "./verifier";

export class UserService{
    //获取用户
    static get():UserData{
        return StorageService.read<UserData>(SysConfig.StorageKey_UserData);
    }

    //设置用户
    static set(user:UserData){
        StorageService.write(SysConfig.StorageKey_UserData, user);
    }    

    //清除用户
    static clear(){
        StorageService.remove(SysConfig.StorageKey_UserData);
    }
    
    //获取UserId
    static getUserId():string{
        let user = StorageService.read<UserData>(SysConfig.StorageKey_UserData);
        if(!Verifier.isNull(user) && !Verifier.isNull(user.Id))
        {
            return user.Id;
        }
        else
        {
            return null;
        }
    }
}
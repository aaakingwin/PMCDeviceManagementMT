import { UserInfoData  } from './../model/userinfodata';

export class UserInfoService{
    constructor() { }
    
    login(user: UserInfoData) {
        if(user.LoginID=='admin' && user.LoginPwd=='123')
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
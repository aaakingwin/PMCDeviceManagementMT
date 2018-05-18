import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData  } from '../../model/userdata';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {}

  login(user: UserData) {
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

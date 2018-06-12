export class UserData {
    Token:string;
    Id:string;
    Name:string;
    Password:string;
    FullName:string;
    Telephone:string;
    RoleId:string;
    EquipmentIdentity:string;
}

export class UserResponse
{
    Data:{Token:string};
    Success:boolean;
    Message:string;
    Count:number;
}

export class LoginRequest
{
    UserName:string;
    Password:string;
}

export class UserApi{
    static readonly PostLogin='authentication/login';
}
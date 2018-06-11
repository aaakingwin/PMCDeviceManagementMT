export class UserData {
    Token:string;
    Id:string;
    Name:string;
    Password:string;
    FullName:string;
    Telephone:string;
    RoleId:string;
    EquipmentIdentity:string;
    IsDisabled:boolean;
    CreatedTime:string;
    LastModifyedTime:string;
}

export class UserDTO
{
    Data:{Token:string};
    Success:string;
    Message:string;
}

export class UserApi{
    static readonly GetSingle='user/single?';
    static readonly PostLogin='authentication/login';
}
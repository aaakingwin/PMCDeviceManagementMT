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
    Success:boolean;
    Message:string;
    Count:number;
}

export class UserApi{
    static readonly PostLogin='authentication/login';
}
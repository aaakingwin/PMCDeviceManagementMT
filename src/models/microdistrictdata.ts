export class MicrodistrictData
{
    Id:string;
    Name:string;
    Address:string;
    PropertyManagementCompany:string;
    CreatedTime:string;
    LastModifyedTime:string;
}

export class MicrodistrictDTO
{
    Data:MicrodistrictData[];
    Success:string;
    Message:string;
}

export class MicrodistrictApi
{
    static readonly GetAll:string='microdistrict/all';
}
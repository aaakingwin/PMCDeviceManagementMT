export class MicrodistrictData
{
    Id:string;
    Name:string;
    Address:string;
    PropertyManagementCompany:string;
    CreatedTime:string;
    LastModifyedTime:string;
}

export class MicrodistrictResponse
{
    Data:any;
    Success:boolean;
    Message:string;
    Count:number;
}

export class MicrodistrictApi
{
    static readonly GetAll='microdistrict/all';
}
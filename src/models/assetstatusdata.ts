export class AssetStatusData
{
    Id:string;
    Name:string;
}

export class AssetStatusResponse
{
    Data:any;
    Success:boolean;
    Message:string;
    Count:number;
}

export class AssetStatusApi
{
    static readonly GetAll='assetstatus/all';
}
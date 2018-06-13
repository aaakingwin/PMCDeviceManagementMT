//系统配置
export class SysConfig {    
    //WebApi
    static readonly WebApi_RootUrl='http://6f390792d13a.sn.mynetname.net:7474/api/v1/';//根路径
    static readonly WebApi_GetAll='all';
    static readonly WebApi_GetMultiple='multiple?';
    static readonly WebApi_GetSingle='single?';
    static readonly WebApi_PostCreate='create?';
    static readonly WebApi_PostLogin='login';
    static readonly WebApi_Asset='asset/';
    static readonly WebApi_Microdistrict='microdistrict/';
    static readonly WebApi_Authentication='authentication/';
    static readonly WebApi_AssetStatus='assetstatus/';
    static readonly WebApi_Inspection='inspection/';
    static readonly WebApi_Maintenance='maintenancerequest/';
    //本地缓存
    static readonly StorageKey_UserData='UserData';//当前用户
    static readonly StorageKey_SelectedMicrodistrict='SelectedMicrodistrict';//被选中的小区
    static readonly StorageKey_AssetStatusList='AssetStatusList';//资产状态列表
    //操作类型
    static readonly OperationType_See='See';
    static readonly OperationType_Create='Create';
    static readonly OperationType_Edit='Edit';
    
}
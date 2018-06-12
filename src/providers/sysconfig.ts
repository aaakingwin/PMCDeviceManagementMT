//系统配置
export class SysConfig {    
    static readonly WebApiRootUrl:string='http://6f390792d13a.sn.mynetname.net:7474/api/v1/';//根路径
    static readonly StorageKey_UserData:string='UserData';//当前用户
    static readonly StorageKey_SelectedMicrodistrict:string='SelectedMicrodistrict';//被选中的小区
    static readonly StorageKey_AssetStatusList:string='AssetStatusList';//资产状态列表
    static readonly OperationType_See='See';
    static readonly OperationType_Create='Create';
    static readonly OperationType_Edit='Edit';
}
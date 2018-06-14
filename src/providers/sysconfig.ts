//系统配置
export class SysConfig {   
    static readonly ApkName='test.apk'; 
    static readonly AppUpdateUrl='http://192.168.13.194:8888/apk/app-debug.apk';
    //WebApi
    static readonly WebApi_RootUrl='http://6f390792d13a.sn.mynetname.net:7474/api/v1/';//根路径
    static readonly WebApi_Param_User='userid=';
    static readonly WebApi_Get_View='view?';
    static readonly WebApi_Get_Scan='scan?';
    static readonly WebApi_Post_Create='model?';
    static readonly WebApi_Post_Login='login';
    static readonly WebApi_Module_Asset='asset/';
    static readonly WebApi_Module_Microdistrict='microdistrict/';
    static readonly WebApi_Module_Authentication='authentication/';
    static readonly WebApi_Module_AssetStatus='assetstatus/';
    static readonly WebApi_Module_Inspection='inspection/';
    static readonly WebApi_Module_Maintenance='repairapplication/';
    //本地缓存
    static readonly StorageKey_UserData='UserData';//当前用户
    static readonly StorageKey_SelectedMicrodistrict='SelectedMicrodistrict';//被选中的小区
    static readonly StorageKey_AssetStatusList='AssetStatusList';//资产状态列表
    //操作类型
    static readonly OperationType_See='See';
    static readonly OperationType_Create='Create';
    static readonly OperationType_Edit='Edit';
    
}
//系统配置
export class SysConfig {   
    //服务器地址
    //正式IP='58.211.58.110';
    //正式Port='1105';
    //测试IP='6f390792d13a.sn.mynetname.net';
    //测试Port='7474';
    static readonly DefaultUrlIP='58.211.58.110';
    static readonly DefaultUrlPort='1105';
    //WebApi
    static readonly WebApi_Root='/api/v1/';//根路径
    static readonly WebApi_Param_User='userid=';
    static readonly WebApi_Get_Signin='signin?';
    static readonly WebApi_Get_Scan='scan?';
    static readonly WebApi_Get_All='all?'; 
    static readonly WebApi_Get_Single='single?';
    static readonly WebApi_Get_Multiple='multiple?';
    static readonly WebApi_Post_Create='create?';
    static readonly WebApi_Patch_ChangePassword='changepassword?';
    static readonly WebApi_Module_Asset='asset/';
    static readonly WebApi_Module_Microdistrict='microdistrict/';
    static readonly WebApi_Module_Authentication='authentication/';
    static readonly WebApi_Module_AssetStatus='assetstatus/';
    static readonly WebApi_Module_Inspection='inspection/';
    static readonly WebApi_Module_Maintenance='repairapplication/';
    static readonly WebApi_Module_AppVersion='appversion/';
    static readonly WebApi_Module_User='user/';
    //本地缓存
    static readonly StorageKey_UserData='UserData';//当前用户
    static readonly StorageKey_SelectedMicrodistrict='SelectedMicrodistrict';//被选中的小区
    static readonly StorageKey_AssetStatusList='AssetStatusList';//资产状态列表
    static readonly StorageKey_AppVersion='AppVersion';//当前app信息
    static readonly StorageKey_UrlIP='UrlIP';//IP
    static readonly StorageKey_UrlPort='UrlPort';//端口
    //操作类型
    static readonly OperationType_See='See';
    static readonly OperationType_Create='Create';
    static readonly OperationType_Edit='Edit';
    //显示内容
    static readonly ShowText_SelectedMicrodistrict='请选择小区';
}
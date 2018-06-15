import { StorageService } from "./storageservice";
import { SysConfig } from "./sysconfig";
import { Verifier } from "./verifier";
import { AppVersionData } from "../models/appversiondata";

export class AppInfoService{
    //获取
    static getAppVersionData():AppVersionData{
        return StorageService.read<AppVersionData>(SysConfig.StorageKey_AppVersion);
    }

    //设置
    static setAppVersionData(version:AppVersionData){
        StorageService.write(SysConfig.StorageKey_AppVersion, version);
    }    
    
    //获取版本号
    static getVersionCode():string{
        let version = StorageService.read<AppVersionData>(SysConfig.StorageKey_AppVersion);
        if(!Verifier.isNull(version) && !Verifier.isNull(version.Version))
        {
            return version.Version;
        }
        else
        {
            return '';
        }
    }
}
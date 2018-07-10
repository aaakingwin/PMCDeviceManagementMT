import { StorageService } from "./storageservice";
import { SysConfig } from "./sysconfig";
import { Verifier } from "./verifier";

//url
export class UrlService {
  //获取IP
  static getIP():string{
    let ip = StorageService.read<string>(SysConfig.StorageKey_UrlIP);
    if(Verifier.isNull(ip))
    {
      return SysConfig.DefaultUrlIP;
    }
    else
    {
      return ip;
    }
  }
  //获取端口
  static getPort():string{
    let port = StorageService.read<string>(SysConfig.StorageKey_UrlPort);
    if(Verifier.isNull(port))
    {
      return SysConfig.DefaultUrlPort;
    }
    else
    {
      return port;
    }
  }
  //获取Url
  static getUrl():string{
    return 'http://' + this.getIP() + ':' + this.getPort();
  }
  //保存
  static save(ip:string,port:string){
    StorageService.write(SysConfig.StorageKey_UrlIP,ip);
    StorageService.write(SysConfig.StorageKey_UrlPort,port);
  }
}

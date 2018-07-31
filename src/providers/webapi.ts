import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SysConfig } from './sysconfig';
import { UrlService } from './urlservice';
//WebApi
@Injectable()
export class WebApi {
  constructor(public http: HttpClient) {}
  //Get方法
  get<T>(api:string)
  { 
    return this.http.get<T>(UrlService.getUrl() + SysConfig.WebApi_Root + api);
  }
  //Post方法
  post<T>(api:string,param:any)
  {
    let body = JSON.stringify(param);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<T>(UrlService.getUrl() + SysConfig.WebApi_Root + api, body, { headers });
  }
  //Patch
  patch<T>(api:string,param:any)
  {
    let body = JSON.stringify(param);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.patch<T>(UrlService.getUrl() + SysConfig.WebApi_Root + api, body, { headers });
  }
}

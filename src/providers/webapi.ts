import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SysConfig } from './sysconfig';
//WebApi
@Injectable()
export class WebApi {
  rootUrl:string;
  constructor(public http: HttpClient) 
  {
    this.rootUrl=SysConfig.WebApi_RootUrl;
  }
  //Get方法
  get<T>(api:string)
  { 
    return this.http.get<T>(this.rootUrl+api);
  }
  //Post方法
  post<T>(api:string,param:any)
  {
    let body = JSON.stringify(param);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<T>(this.rootUrl+api, body, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SysConfig } from './sysconfig';
//WebApi
@Injectable()
export class WebApi {
  root:string;
  constructor(public http: HttpClient) 
  {
    this.root=SysConfig.RootUrl+SysConfig.WebApi_Root;
  }
  //Get方法
  get<T>(api:string)
  { 
    return this.http.get<T>(this.root+api);
  }
  //Post方法
  post<T>(api:string,param:any)
  {
    let body = JSON.stringify(param);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<T>(this.root+api, body, { headers });
  }
}

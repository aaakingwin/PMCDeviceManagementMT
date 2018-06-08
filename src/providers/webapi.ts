import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SysConfig } from './sysconfig';
//WebApi
@Injectable()
export class WebApi {
  rootUrl:string;
  constructor(public http: HttpClient) 
  {
    this.rootUrl=SysConfig.WebApiRootUrl;
  }
  //Get方法
  get<T>(api:string)
  { 
    return this.http.get<T>(this.rootUrl+api);
  }
}

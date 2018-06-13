import { Verifier } from "./verifier";

//转换服务
export class Converter
{
    //转换日期
    static toYYYYMMDD(iso:string):string
    {        
        if(!Verifier.isNull(iso))
        {
            if(iso.length>10)
            {
                return iso.substring(0,10);
            }
        }        
        return iso;
    }
}
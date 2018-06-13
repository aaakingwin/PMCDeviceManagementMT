//验证
export class Verifier
{
    //判断空值
    static isNull(value:any):boolean{
        if (value && value != null && value != "undefined" && value != "null") {
            return false;
        }
        else
        {
            return true;
        }        
    }
}
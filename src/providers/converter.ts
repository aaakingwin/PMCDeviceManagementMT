//转换服务
export class Converter
{
    constructor() { }
    //转换日期
    static toYYYYMMDD(iso:string):string
    {
        let ret=iso.substring(0,10);
        return ret;
    }
}
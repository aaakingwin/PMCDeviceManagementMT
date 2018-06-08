//本地存储服务
export class StorageService {
    constructor() { }
    //写入
    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
    //读取
    read<T>(key: string): T {
        let value: string = localStorage.getItem(key);
        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }
        else
        {
            return null;
        }        
    }
    //移除
    remove(key: string) {
        localStorage.removeItem(key);
    }
    //清空
    clear() {
        sessionStorage.clear();
    }
}
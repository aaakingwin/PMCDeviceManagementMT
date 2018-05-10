export class StorageService {
    constructor() { }

    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

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

    remove(key: string) {
        localStorage.removeItem(key);
    }
    
    clear() {
        sessionStorage.clear();
    }
}
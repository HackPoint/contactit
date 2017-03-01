const KEY_STORAGE: string = "CONTACT_FORM:KEY";

export interface ILocalStorageService {
    set<T>(key: string, ...data: Array<T>): void;
    get<T>(key: string): Array<T>;
    update<T>(key: string, ...data: Array<T>): void;
}
export class LocalStorageService {
    constructor() {
    }

    public set<T>(key: string, ...data: Array<T>): void {
        let allItems: Array<T> = this.getByKey(KEY_STORAGE + key)  || [];
        // append new data
        Array.prototype.push.apply(allItems, data);
        localStorage.setItem(KEY_STORAGE + key, JSON.stringify(allItems));
    }

    public get<T>(key: string): Array<T> {
        return this.getByKey(KEY_STORAGE + key)  || [];
    }

    public update<T>(key: string, ...data: Array<T>): void {
        localStorage.setItem(KEY_STORAGE + key, JSON.stringify(data));
    }
    private getByKey(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
}

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
        this.update<T>(key, ...data);
    }

    public get<T>(key: string): Array<T> {
        return this.getByKey(KEY_STORAGE + key) || [];
    }

    public update<T>(key: string, ...data: Array<T>): void {
        localStorage.setItem(KEY_STORAGE + key, JSON.stringify(data));
    }

    private getByKey(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
}

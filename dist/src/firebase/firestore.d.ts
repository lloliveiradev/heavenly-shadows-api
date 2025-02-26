import * as firebaseAdmin from 'firebase-admin';
import { apiUser, fsGetWhereOpt, fsFilters } from 'types';
export declare class Firestore {
    private readonly db;
    private readonly collection;
    private readonly sub;
    constructor(db: firebaseAdmin.firestore.Firestore, collection: string, sub: boolean);
    add(data: {
        [key: string]: any;
    }, user: object): Promise<string>;
    set(id: string, data: {
        [key: string]: any;
    }, user: object, merge?: boolean): Promise<void>;
    get(id: string): Promise<any>;
    getWhere(options?: fsGetWhereOpt): Promise<Array<any>>;
    delete(id: string, user: apiUser, real?: boolean): Promise<void>;
    aggregate(type: 'avg' | 'count' | 'sum' | Array<string>, filters: fsFilters, fields: Array<string>): Promise<any>;
    ref(id: string): Promise<firebaseAdmin.firestore.DocumentReference | null>;
}

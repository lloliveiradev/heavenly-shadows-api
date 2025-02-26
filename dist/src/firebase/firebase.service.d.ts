import { FirebaseConfigService } from './firebase-config.service';
import { apiUser } from 'types';
export declare class FirebaseService {
    private readonly apiKey;
    private readonly db;
    constructor(firebaseConfig: FirebaseConfigService);
    getRecords(collection: string, id: string | null, options: any): Promise<any>;
    createRecord(collection: string, data: any, user: apiUser): Promise<string>;
    updateRecord(collection: string, id: string, data: any, user: apiUser): Promise<void>;
    deleteRecord(collection: string, id: string, user: apiUser): Promise<void>;
}

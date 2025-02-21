import * as firebaseAdmin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { FirebaseConfigService } from './firebase-config.service';
import { Firestore } from './firestore';
import { apiUser } from 'types';

@Injectable()
export class FirebaseService {
  private readonly apiKey: string;
  private readonly db: firebaseAdmin.firestore.Firestore;

  constructor(firebaseConfig: FirebaseConfigService) {
    this.apiKey = firebaseConfig.apiKey;
    this.db = firebaseAdmin.firestore();
  }

  async getRecords(collection: string, id: string | null, options: any) {
    const db = new Firestore(firebaseAdmin.firestore(), collection, false);
    if (id) {
      return await db.get(id);
    } else {
      return await db.getWhere(options);
    }
  }

  async createRecord(collection: string, data: any, user: apiUser) {
    const db = new Firestore(firebaseAdmin.firestore(), collection, false);
    return await db.add(data, user);
  }

  async updateRecord(collection: string, id: string, data: any, user: apiUser) {
    const db = new Firestore(firebaseAdmin.firestore(), collection, false);
    return await db.set(id, data, user);
  }

  async deleteRecord(collection: string, id: string, user: apiUser) {
    const db = new Firestore(firebaseAdmin.firestore(), collection, false);
    return await db.delete(id, user);
  }
}

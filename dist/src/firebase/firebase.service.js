"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const firebaseAdmin = require("firebase-admin");
const common_1 = require("@nestjs/common");
const firebase_config_service_1 = require("./firebase-config.service");
const firestore_1 = require("./firestore");
let FirebaseService = class FirebaseService {
    constructor(firebaseConfig) {
        this.apiKey = firebaseConfig.apiKey;
        this.db = firebaseAdmin.firestore();
    }
    async getRecords(collection, id, options) {
        const db = new firestore_1.Firestore(firebaseAdmin.firestore(), collection, false);
        if (id) {
            return await db.get(id);
        }
        else {
            return await db.getWhere(options);
        }
    }
    async createRecord(collection, data, user) {
        const db = new firestore_1.Firestore(firebaseAdmin.firestore(), collection, false);
        return await db.add(data, user);
    }
    async updateRecord(collection, id, data, user) {
        const db = new firestore_1.Firestore(firebaseAdmin.firestore(), collection, false);
        return await db.set(id, data, user);
    }
    async deleteRecord(collection, id, user) {
        const db = new firestore_1.Firestore(firebaseAdmin.firestore(), collection, false);
        return await db.delete(id, user);
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map
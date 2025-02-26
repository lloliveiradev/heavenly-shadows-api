"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const firebaseAdmin = require("firebase-admin");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_config_service_1 = require("./firebase-config.service");
const firebase_service_1 = require("./firebase.service");
let FirebaseModule = FirebaseModule_1 = class FirebaseModule {
    static forRoot() {
        const firebaseConfigProvider = {
            provide: firebase_config_service_1.FirebaseConfigService,
            inject: [config_1.ConfigService],
            useFactory: (configService) => {
                const apiKey = configService.get('FB_API_KEY');
                if (!apiKey) {
                    throw new Error('FIREBASE_API_KEY environment variable is not set');
                }
                return new firebase_config_service_1.FirebaseConfigService(apiKey);
            },
        };
        const firebaseProvider = {
            provide: 'FIREBASE_ADMIN',
            inject: [config_1.ConfigService],
            useFactory: async (configService) => {
                const credentials = configService.get('FB_ADMIN_CREDENTIALS');
                if (!credentials) {
                    throw new Error('FIREBASE_ADMIN_CREDENTIALS environment variable is not set');
                }
                const serviceAccount = JSON.parse(credentials);
                firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(serviceAccount),
                });
                return firebaseAdmin;
            },
        };
        return {
            module: FirebaseModule_1,
            providers: [firebaseConfigProvider, firebaseProvider, firebase_service_1.FirebaseService],
            exports: [firebaseConfigProvider, firebaseProvider, firebase_service_1.FirebaseService],
        };
    }
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = FirebaseModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [firebase_service_1.FirebaseService, firebase_config_service_1.FirebaseConfigService, config_1.ConfigService],
        exports: [firebase_service_1.FirebaseService],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map
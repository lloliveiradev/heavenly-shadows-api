"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseConfigService = void 0;
class FirebaseConfigService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        if (!apiKey) {
            throw new Error('Missing required Firebase API key');
        }
    }
}
exports.FirebaseConfigService = FirebaseConfigService;
//# sourceMappingURL=firebase-config.service.js.map
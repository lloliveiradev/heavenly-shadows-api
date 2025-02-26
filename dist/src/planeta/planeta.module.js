"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetaModule = void 0;
const common_1 = require("@nestjs/common");
const planeta_service_1 = require("./planeta.service");
const planeta_controller_1 = require("./planeta.controller");
let PlanetaModule = class PlanetaModule {
};
exports.PlanetaModule = PlanetaModule;
exports.PlanetaModule = PlanetaModule = __decorate([
    (0, common_1.Module)({
        controllers: [planeta_controller_1.PlanetaController],
        providers: [planeta_service_1.PlanetaService],
    })
], PlanetaModule);
//# sourceMappingURL=planeta.module.js.map
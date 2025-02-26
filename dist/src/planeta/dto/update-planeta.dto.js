"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanetaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_planeta_dto_1 = require("./create-planeta.dto");
class UpdatePlanetaDto extends (0, swagger_1.PartialType)(create_planeta_dto_1.CreatePlanetaDto) {
}
exports.UpdatePlanetaDto = UpdatePlanetaDto;
//# sourceMappingURL=update-planeta.dto.js.map
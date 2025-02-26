"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePoesiaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_poesia_dto_1 = require("./create-poesia.dto");
class UpdatePoesiaDto extends (0, mapped_types_1.PartialType)(create_poesia_dto_1.CreatePoesiaDto) {
}
exports.UpdatePoesiaDto = UpdatePoesiaDto;
//# sourceMappingURL=update-poesia.dto.js.map
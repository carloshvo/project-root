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
exports.UpdateMaterialDto = exports.CreateMaterialDto = void 0;
const class_validator_1 = require("class-validator");
class CreateMaterialDto {
}
exports.CreateMaterialDto = CreateMaterialDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Código deve ter no mínimo 3 caracteres' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaterialDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMaterialDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1, { message: 'Unidade de medida deve ser preenchida' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "unidade_medida", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Quantidade de estoque não pode ser negativa' }),
    __metadata("design:type", Number)
], CreateMaterialDto.prototype, "quantidade_estoque", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Estoque mínimo não pode ser negativo' }),
    __metadata("design:type", Number)
], CreateMaterialDto.prototype, "estoque_minimo", void 0);
class UpdateMaterialDto {
}
exports.UpdateMaterialDto = UpdateMaterialDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3, { message: 'Código deve ter no mínimo 3 caracteres' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateMaterialDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateMaterialDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1, { message: 'Unidade de medida deve ser preenchida' }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "unidade_medida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Quantidade de estoque não pode ser negativa' }),
    __metadata("design:type", Number)
], UpdateMaterialDto.prototype, "quantidade_estoque", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Estoque mínimo não pode ser negativo' }),
    __metadata("design:type", Number)
], UpdateMaterialDto.prototype, "estoque_minimo", void 0);
//# sourceMappingURL=material.dto.js.map
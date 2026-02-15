import { IsNotEmpty, MinLength, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateMaterialDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Código deve ter no mínimo 3 caracteres' })
    codigo!: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    nome!: string;

    @IsOptional()
    descricao?: string | null;

    @IsOptional()
    categoria?: string | null;

    @IsNotEmpty()
    @MinLength(1, { message: 'Unidade de medida deve ser preenchida' })
    unidade_medida!: string;

    @IsNumber()
    @Min(0, { message: 'Quantidade de estoque não pode ser negativa' })
    quantidade_estoque!: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Estoque mínimo não pode ser negativo' })
    estoque_minimo?: number;
}

export class UpdateMaterialDto {
    @IsOptional()
    @MinLength(3, { message: 'Código deve ter no mínimo 3 caracteres' })
    codigo?: string;

    @IsOptional()
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    nome?: string;

    @IsOptional()
    descricao?: string | null;

    @IsOptional()
    categoria?: string | null;

    @IsOptional()
    @MinLength(1, { message: 'Unidade de medida deve ser preenchida' })
    unidade_medida?: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Quantidade de estoque não pode ser negativa' })
    quantidade_estoque?: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Estoque mínimo não pode ser negativo' })
    estoque_minimo?: number;
}

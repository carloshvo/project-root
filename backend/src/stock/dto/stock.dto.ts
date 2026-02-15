import { IsNotEmpty, IsNumber, Min, IsOptional, IsIn } from 'class-validator';

export class CreateMovementDto {
    @IsNotEmpty()
    @IsNumber()
    materialId!: number;

    @IsOptional()
    @IsNumber()
    usuarioId?: number;

    @IsNotEmpty()
    @IsIn(['entrada', 'saida'], { message: 'Tipo deve ser entrada ou saida' })
    tipo!: 'entrada' | 'saida';

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'Quantidade deve ser maior que zero' })
    quantidade!: number;
}

export class UpdateMovementDto {
    @IsOptional()
    @IsIn(['entrada', 'saida'], { message: 'Tipo deve ser entrada ou saida' })
    tipo?: 'entrada' | 'saida';

    @IsOptional()
    @IsNumber()
    @Min(1, { message: 'Quantidade deve ser maior que zero' })
    quantidade?: number;
}

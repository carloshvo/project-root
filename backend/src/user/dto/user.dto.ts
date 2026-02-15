import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    nome!: string;

    @IsEmail({}, { message: 'Email deve ser válido' })
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
    senha!: string;

    @IsOptional()
    @IsIn(['admin', 'operador'], { message: 'Perfil deve ser admin ou operador' })
    perfil?: string;
}

export class UpdateUserDto {
    @IsOptional()
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    nome?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email deve ser válido' })
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
    senha?: string;

    @IsOptional()
    @IsIn(['admin', 'operador'], { message: 'Perfil deve ser admin ou operador' })
    perfil?: string;
}

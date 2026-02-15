import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationService {
    async validateDto(dtoClass: any, plainObject: any): Promise<void> {
        const instance = plainToInstance(dtoClass, plainObject);
        const errors = await validate(instance);

        if (errors.length > 0) {
            const messages = errors.map(error => this.formatError(error)).flat();
            throw new BadRequestException({
                message: 'Erro de validação',
                errors: messages,
            });
        }
    }

    private formatError(error: ValidationError): string[] {
        const messages: string[] = [];

        if (error.constraints) {
            messages.push(
                ...Object.values(error.constraints),
            );
        }

        if (error.children && error.children.length > 0) {
            messages.push(
                ...error.children.map(child => this.formatError(child)).flat(),
            );
        }

        return messages;
    }
}

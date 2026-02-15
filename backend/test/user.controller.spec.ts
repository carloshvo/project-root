// backend/test/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/presentation/user.controller';
import { UserService } from '../src/application/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, nome: 'Carlos', email: 'carlos@test.com' }),
            findAll: jest.fn().mockResolvedValue([{ id: 1, nome: 'Carlos', email: 'carlos@test.com' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('deve criar um usuário', async () => {
    const result = await controller.create({ nome: 'Carlos', email: 'carlos@test.com', senha: '123456' });
    expect(result).toHaveProperty('id');
    expect(service.create).toHaveBeenCalled();
  });

  it('deve listar usuários', async () => {
    const result = await controller.findAll();
    expect(result.length).toBeGreaterThan(0);
  });
});
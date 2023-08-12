// users.spec.ts
import { AuthModule } from '@/auth/auth.module';
import appConfig from '@/config/app.config';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';

describe('Auth Entity', () => {
  let controller: AuthController;
  let service: AuthService;
  let userController: UsersController;
  let userService: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.local', '.env', '.env.staging', '.env.prod'],
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: appConfig().databaseUri,
          }),
        }),
        UsersModule,
        AuthModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('0. Verify Test Environment', () => {
    it('0-1. Service and Controller should be defined', async () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
      expect(userController).toBeDefined();
      expect(userService).toBeDefined();
    });
  });

  describe('1. Validate User Login Logic', () => {
    let user: any;

    beforeAll(async () => {
      user = await userController.create({
        username: 'test',
        password: 'test123',
      });
    });

    afterAll(async () => {
      if (user) {
        await userService.deleteOne(user._id);
      }
    });
    it('1-1. Login a user', async () => {
      const loggedInUser = await controller.login({
        user: {
          username: user.username,
          password: user.password,
        },
      });
      console.log({ loggedInUser });
      expect(loggedInUser).toHaveProperty('access_token');
    });
    it('1-2. Validate user login input', async () => {
      const validatedUser = await service.validateUser(
        user.username,
        'test123',
      );
      expect(validatedUser).toMatchObject({
        _id: user._id,
        username: user.username,
      });
    });
    it('1-2. Return null if password is wrong', async () => {
      const validatedUser = await service.validateUser(
        user.username,
        'test1234',
      );
      expect(validatedUser).toEqual(null);
    });
    it('1-3. Get user profile', async () => {
      const userProfile = await controller.getProfile({
        user: {
          _id: user._id,
          username: user.username,
        },
      });
      console.log({ userProfile });
      expect(userProfile).toHaveProperty('_id');
      expect(userProfile).toHaveProperty('username');
      expect(userProfile).toMatchObject({
        _id: user._id,
        username: user.username,
      });
    });
  });
});

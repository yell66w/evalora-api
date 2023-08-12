// users.spec.ts
import { AuthModule } from '@/auth/auth.module';
import appConfig from '@/config/app.config';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('User Entity', () => {
  let controller: UsersController;
  let service: UsersService;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        AuthModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  describe('0. Verify Test Environment', () => {
    it('0-1. Service and Controller should be defined', async () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('1. Validate User Creation Logic', () => {
    let user: any;

    afterEach(async () => {
      if (user) {
        await service.deleteOne(user._id);
      }
    });

    it('1-1. Create a user', async () => {
      user = await controller.create({
        username: 'test1',
        password: 'test1',
      });
      console.log(user);
      expect(user).toBeDefined();
      expect(user.password).not.toBeDefined();
    });
  });

  describe('2. Validate User Retrieval Logic', () => {
    const users = [];

    beforeAll(async () => {
      const usersToCreate = [
        {
          username: 'test1',
          password: 'test1',
        },
        {
          username: 'test2',
          password: 'test2',
        },
        {
          username: 'test3',
          password: 'test3',
        },
      ];

      for (const user of usersToCreate) {
        const createdUser: any = await controller.create({
          username: user.username,
          password: user.password,
        });
        users.push(createdUser);
      }
    });

    afterAll(async () => {
      if (users?.length > 0) {
        await service.deleteMany(users.map((user: any) => user._id));
      }
    });
    it('2-1. Retrieve one user', async () => {
      const foundUser = await service.findOne(users[0].username);
      console.log({ foundUser });
      expect(foundUser).toMatchObject({
        _id: users[0]._id,
        username: users[0].username,
        __v: 0,
      });
    });

    it('2-2. Retrieve all users', async () => {
      const foundUsers = await controller.findAll();
      const expectedUsers = users.map((user) => ({
        _id: user._id,
        username: user.username,
        __v: 0,
      }));
      console.log({ foundUsers, expectedUsers });
      expect(foundUsers).toMatchObject(expectedUsers);
    });
  });
});

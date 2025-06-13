import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnv } from 'src/enums/env.enum';
import { REPOSITORIES } from 'src/repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(EEnv.DB_HOST),
        port: configService.get<number>(EEnv.DB_PORT),
        username: configService.get<string>(EEnv.DB_USERNAME),
        password: configService.get<string>(EEnv.DB_PASSWORD),
        database: configService.get<string>(EEnv.DB_DATABASE),
        synchronize: true, // Set to false in production
        logging: true,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      }),
    }),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}

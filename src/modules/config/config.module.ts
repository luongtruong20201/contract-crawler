import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EEnv } from 'src/enums/env.enum';
import { Joi } from 'src/shared/libs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        [EEnv.PORT]: Joi.number().required(),
        [EEnv.DB_HOST]: Joi.string().required(),
        [EEnv.DB_PORT]: Joi.number().required(),
        [EEnv.DB_USERNAME]: Joi.string().required(),
        [EEnv.DB_PASSWORD]: Joi.string().required(),
        [EEnv.DB_DATABASE]: Joi.string().required(),
        [EEnv.RPC_URL]: Joi.string().uri().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}

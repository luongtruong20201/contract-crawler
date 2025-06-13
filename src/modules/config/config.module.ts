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
        [EEnv.MAX_BLOCK_RANGE]: Joi.number().required(),
        [EEnv.MIN_BLOCK_RANGE]: Joi.number().required(),
        [EEnv.SAFE_BLOCK]: Joi.number().required(),
        [EEnv.REDIS_HOST]: Joi.string().required(),
        [EEnv.REDIS_PORT]: Joi.number().required(),
        [EEnv.START_BLOCK]: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}

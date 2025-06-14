import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, [
    'debug',
    'error',
    'fatal',
    'log',
    'verbose',
    'warn',
  ]);
}

bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          
      forbidNonWhitelisted: true, 
      transform: true,          
      transformOptions: {
        enableImplicitConversion: true, 
      },
      validationError: {
        target: false,          
        value: true             
      }
    }),
  );

  await app.listen(3000);
  console.log(`✅ Application running at ${await app.getUrl()}`);
}
bootstrap();
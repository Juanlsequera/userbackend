import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  /// Add port not used process.env
  const app = await NestFactory.create(AppModule);
  /// Set config service (.env)
  const configService: ConfigService = app.get(ConfigService);
  const appPort: string = await configService.get('APP_PORT');
  /// Add validations Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  /// Configuration of titles of documentation
  const options = new DocumentBuilder()
    .setTitle('MongoDB Users REST API')
    .setDescription('API REST para usuarios con MongoDB ( ALTA, LOGIN )')
    .setVersion('1.0')
    .build();
  ///  Route on which the documentation is served
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      showRequestDuration: true,
    },
  });

  /// Set config keys aws s3
  config.update({
    accessKeyId: configService.get('AWS_KEY'),
    secretAccessKey: configService.get('AWS_SECRET'),
  });

  await app.listen(appPort);
  console.info(`PORT LISTEN : ${appPort}`);
}
bootstrap();

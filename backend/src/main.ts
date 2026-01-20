import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
    origin: "http://localhost:3000", // juste le domaine
    credentials: true,               // permet l’envoi des cookies httpOnly
  });
  await app.listen(process.env.API_PORT ?? 3001);
}
bootstrap();

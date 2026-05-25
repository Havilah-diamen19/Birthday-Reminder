import { NestFactory } from '@nestjs/core';
import { BirthdayModule } from './birthday-remainder.module.';

async function bootstrap() {
  const app = await NestFactory.create(BirthdayModule);

   app.enableCors({
    origin: '*', // for dev only
  });
  await app.listen(process.env.PORT ?? 4000);
  console.log(`http://localhost:${4000}`)
}
bootstrap();

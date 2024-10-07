import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthInterceptor } from './employee/middlewares/auth.employee.Interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new AuthInterceptor())  // Global level interceptor
  await app.listen(3002,()=>{
    console.log("Employee Service ready at http://localhost:3002")
  });
}
bootstrap();

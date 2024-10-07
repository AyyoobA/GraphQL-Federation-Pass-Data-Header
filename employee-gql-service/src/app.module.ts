import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Location } from './employee/entity/location.entity';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { EmployeeModule } from './employee/employee.module';
import { Project } from './employee/entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthInterceptor } from './employee/middlewares/auth.employee.Interceptor';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './employee/employee.service';

@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Project, Location],
      },
      context: ({ req }) => {
        const authToken = req.headers.authorization || '';
        const userId = req.headers['user-id'] || null;
        console.log(userId)
        return { authToken, userId };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ayyoobajward',
      password: 'mysecretpassword',
      database: 'employee',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthInterceptor, 
    {provide: "AUTH_INTERCEPTOR",scope: Scope.REQUEST, useClass: AuthInterceptor}
  ],
  exports: [AppService]
}) 
export class AppModule {
  // implements NestModule{
    // configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(AuthInterceptor)
    //     .forRoutes('*');
    // }
}

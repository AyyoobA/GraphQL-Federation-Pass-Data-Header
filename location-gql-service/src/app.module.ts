import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LocationModule } from './location/location.module';

@Module({
  imports: [LocationModule, GraphQLFederationModule.forRoot(
    {
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql')
    }
  ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ayyoobajward',
      password: 'mysecretpassword',
      database: 'location',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule { }

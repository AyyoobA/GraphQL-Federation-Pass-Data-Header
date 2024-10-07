import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

const allowedHeaders = ['authorization', 'x-shared-data'];

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    const incommingHeaders = context?.req?.headers;
    if (incommingHeaders) {
      for (const header of allowedHeaders) {
        const value = incommingHeaders[header];
        if (value) request.http.headers.set(header, value);
      }
    }
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        // cors: true,
        context: ({ req }) => ( {
          // req
        } ),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'employees', url: 'http://localhost:3002/graphql' },
            { name: 'projects', url: 'http://localhost:3004/graphql' },
            { name: 'locations', url: 'http://localhost:3003/graphql' },
          ],
        }),
        buildService({ url }) {
          return new AuthenticatedDataSource({
            url,
          });
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

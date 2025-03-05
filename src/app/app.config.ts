import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { inject } from '@angular/core';

export function createApollo(httpLink: HttpLink) {
  return {
    link: ApolloLink.from([
      httpLink.create({ uri: 'http://localhost:4000/graphql' }),
    ]),
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(() => createApollo(inject(HttpLink))),
  ],
};

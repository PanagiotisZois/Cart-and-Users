import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class ApolloClientService {
  constructor(private httpLink: HttpLink) {}

  createApolloClient(): ApolloClient<any> {
    return new ApolloClient({
      link: ApolloLink.from([
        this.httpLink.create({ uri: 'http://localhost:4000/graphql' }),
      ]),
      cache: new InMemoryCache(),
    });
  }
}

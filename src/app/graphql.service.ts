import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  // Method for fetching users
  getUsers(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    }).valueChanges;
  }

  // Mutation for adding a user
  addUser(name: string, email: string) {
    console.log('Sending addUser mutation with:', { name, email });
    return this.apollo
      .mutate({
        mutation: gql`
          mutation AddUser($name: String!, $email: String!) {
            addUser(name: $name, email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: { name, email },
      })
      .pipe(
        map((response: any) => response.data.addUser) // Επιστρέφει το νέο χρήστη;
      );
  }

  // Mutation for deleting a user
  deleteUser(id: string) {
    console.log('Sending deleteUser mutation with ID:', id);
    return this.apollo
      .mutate({
        mutation: gql`
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id) {
              id
              name
              email
            }
          }
        `,
        variables: { id },
      })
      .pipe(
        map((response: any) => response.data.addUser) // Επιστρέφει το diegramm;eno χρήστη;
      );
  }
}

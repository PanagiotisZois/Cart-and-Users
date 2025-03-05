const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID
    name: String
    email: String
  }
`);

// In-memory user data
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
];

// Root resolver
const root = {
  users: () => users,

  addUser: ({ name, email }) => {
   console.log("User added to server");
    const newUser = { id: String(users.length + 1), name, email };
    users.push(newUser);
    return newUser;
  },

  deleteUser: ({ id }) => {
    console.log("User deleted from server");

    // Αν το id είναι string στο schema, εξασφαλίζουμε ότι είναι string και εδώ
    const userId = String(id);

    // Βρίσκουμε το χρήστη που θέλουμε να διαγράψουμε
    const index = users.findIndex(user => String(user.id) === userId);

    if (index === -1) {
      return null; // Επιστρέφουμε null αν δεν βρούμε το χρήστη
    }

    // Αφαιρούμε το χρήστη από τη λίστα
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser; // Επιστρέφουμε το διαγραμμένο χρήστη
  }
};

const app = express();

// Enable CORS for your frontend (http://localhost:4200)
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST']
}));

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Start the server
app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));

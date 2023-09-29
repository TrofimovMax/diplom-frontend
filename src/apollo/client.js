import { ApolloClient, InMemoryCache } from "@apollo/client";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTYwODExNDUsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiY2ZhNjY2OGEtZGZmNy00N2FhLTk0NTAtZDUxNDAwODY5MWIwIn0.6WnOC6szFmKHfJvztqPhaJcF2vG1hNFH5gLc0_zY6ik";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
})

export const navigatorClient = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Rightway-Consumer-Version': 'Advocate WEB Application',
    },
})

// const firstLink = new HttpLink({
//   uri: "http://localhost:3001/graphql",
//   // other link options...
// });
//
// // Create Second Link
// const secondLink = new HttpLink({
//   uri: "http://localhost:3000/graphql",
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//     'Rightway-Consumer-Version': 'Advocate WEB Application',
//   },
//   // other link options...
// });
//
// const client = new ApolloClient({
//   link: ApolloLink.split(
//     (operation) => operation.getContext().clientName === "second", // Routes the query to the proper client
//     secondLink,
//     firstLink
//   ),
//   cache: new InMemoryCache().restore(initialState || {}),
// });


export default client;

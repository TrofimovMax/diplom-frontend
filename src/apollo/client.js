import {ApolloClient, InMemoryCache} from "@apollo/client";


const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
})


const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU5OTE2MzMsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiOWViYTMyMjAtMjg1Yi00NDdiLWEwZmQtYTMxYjhmNWM2MjgyIn0.2Fz2CVALSLgoSIMy6U8HIwLjT6NMrJciKo-tkaQQ4Uk";

export const navigatorClient = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Rightway-Consumer-Version': 'Advocate WEB Application',
    },
})


export default client;

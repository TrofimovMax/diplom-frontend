import { ApolloClient, InMemoryCache } from "@apollo/client";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTYzMjk1NTEsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiNDVhNzgwZGItNWM1Yy00YTVmLTk4MWYtNDZhYjZjMzg3NTA1In0.TvL90hdmikSwi30npBpsn-Utbdq1zXTAj1W46RxVpRQ";

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache,
})

export const navigatorClient = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Rightway-Consumer-Version': 'Advocate WEB Application',
    },
})
export default client;

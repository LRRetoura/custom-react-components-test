import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject
} from '@apollo/client';

export const apiClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/"
});
import { QueryResult, MutationFn, MutationResult } from 'react-apollo';

export interface ApolloQueryResult extends QueryResult {}

export interface ApolloMutationResult {
  mutation: MutationFn;
  result: MutationResult;
}
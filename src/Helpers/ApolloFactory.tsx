import React from 'react';
import { DataProxy } from 'apollo-cache';
import {
  GraphQLRequest,
  FetchPolicy,
  ApolloError,
  FetchResult
} from 'apollo-boost'
import {
  Mutation,
  Query,
  MutationResult,
  MutationFn,
  QueryResult
} from 'react-apollo'

export const MutationFactory = (
  query: GraphQLRequest,
  update?: (cache: DataProxy, data: FetchResult) => void,
  onError?: (error: ApolloError) => void
) => {
  return ({ render }: any) => (
    <Mutation
      mutation={query}
      update={update}
      onError={onError}
    >
      { (mutation: MutationFn, result: MutationResult) => (
        render({ mutation, result })
      ) }
    </Mutation>
  )
}

export interface QueryFactoryInterface {
  query: GraphQLRequest;
  variables?: { [key: string]: any };
  pollInterval?: number;
  fetchPolicy?: FetchPolicy;
  partialRefetch?: boolean;
  onError?: (error: ApolloError) => void;
  onCompleted?: (data: any) => void;
}

export const QueryFactory = ({
  query,
  variables = {},
  pollInterval = 0,
  fetchPolicy = 'cache-first',
  partialRefetch = false,
  onError,
  onCompleted,
}: QueryFactoryInterface) => {
  return ({ render }: any) => (
    <Query
      query={query}
      variables={variables}
      pollInterval={pollInterval}
      fetchPolicy={fetchPolicy}
      partialRefetch={partialRefetch}
      onError={onError}
      onCompleted={onCompleted}
    >
      { (result: QueryResult) => render({ result }) }
    </Query>
  )
}

import React from 'react';
import { gql, GraphQLRequest, FetchPolicy, ApolloError } from 'apollo-boost'
import { Mutation, Query, MutationResult, QueryResult, MutationFn } from 'react-apollo'
import { TODO_FRAGMENT } from '../Fragment/commonFragments';

export interface QueryFactoryInterface {
  query: GraphQLRequest;
  variables?: { [key: string]: any };
  pollInterval?: number;
  children?: React.ReactNode;
  fetchPolicy?: FetchPolicy;
  onError?: (error: ApolloError) => void;
  onCompleted?: () => void;
}

export const MutationFactory = (
  query: GraphQLRequest,
  update?: () => void,
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

// children={(result: QueryResult) => render({ result })}
export const QueryFactory = ({
  query,
  children,
  variables = {},
  pollInterval = 0,
  fetchPolicy = 'cache-first',
  onError,
  onCompleted
}: QueryFactoryInterface) => {
  return (
    <Query
      query={query}
      variables={variables}
      children={() => children}
      pollInterval={pollInterval}
      fetchPolicy={fetchPolicy}
      onError={onError}
      onCompleted={onCompleted}
    />
  )
}

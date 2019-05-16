import React from 'react';
import { gql} from 'apollo-boost'
import { TODO_FRAGMENT } from '../Fragment/commonFragments';

export const ALL_TODOS = gql`
  {
    todos: allTodoes {
      ...TODO_FRAGMENT
    }
  }
`
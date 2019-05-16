import { gql} from 'apollo-boost'
import { TODO_FRAGMENT } from '../fragments/commonFragments';

export const ALL_TODOS = gql`
  {
    todos: allTodoes {
      ...${TODO_FRAGMENT}
    }
  }
`
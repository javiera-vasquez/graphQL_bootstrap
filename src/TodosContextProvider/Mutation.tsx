import { gql } from 'apollo-boost'
import { TODO_FRAGMENT } from '../fragments/commonFragments';

export const CREATE_TODO = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      ${TODO_FRAGMENT}
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      ${TODO_FRAGMENT}
    }
  }
`

export const DELETE_TODO = gql`
mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    id
  }
}
`
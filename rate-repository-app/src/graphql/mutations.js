import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

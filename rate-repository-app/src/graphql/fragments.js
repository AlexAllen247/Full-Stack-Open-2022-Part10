import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    language
    description
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`;

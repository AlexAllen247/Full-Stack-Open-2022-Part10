import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const convertSortBy = (sortBy) => {
  if (!sortBy)
    return null;

  switch (sortBy) {
    case 'latest':
      return ({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
    case 'highestRated':
      return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
    case 'lowestRated':
      return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
    default:
      return ({});
  }
};

const useRepositories = (sortBy, searchKeyword) => {
  const variables = { ...convertSortBy(sortBy), searchKeyword };
  const [repositories, setRepositories] = useState();

  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const fetchRepositories = async () => {
    let json = null;
    if (!loading) {
      json = data.repositories;
    }
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading]);

  return { repositories, loading, refetch };
};

export default useRepositories;

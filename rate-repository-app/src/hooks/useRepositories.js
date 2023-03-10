import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const convertSortBy = (sortBy) => {
  if (!sortBy) return null;

  switch (sortBy) {
    case "latest":
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    case "highestRated":
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    case "lowestRated":
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    default:
      return {};
  }
};

const useRepositories = (sortBy, searchKeyword) => {
  const variables = { ...convertSortBy(sortBy), searchKeyword, first: 5 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;

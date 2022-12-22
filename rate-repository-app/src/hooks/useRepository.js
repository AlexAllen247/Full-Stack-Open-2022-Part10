import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return { repository: data ? data.repository : undefined, ...result };
};

export default useRepository;

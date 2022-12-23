import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, payload] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const payload = await mutate({
      variables: { id },
    });

    return payload;
  };

  return [deleteReview, payload];
};

export default useDeleteReview;

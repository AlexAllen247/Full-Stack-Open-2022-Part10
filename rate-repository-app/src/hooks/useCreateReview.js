import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.error(error);
    },
  });

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const createReviewResponse = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating,
          text,
        },
      },
    });

    return createReviewResponse;
  };

  return [createReview, result];
};

export default useCreateReview;

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.error(error);
    },
  });

  const signUp = async ({ username, password }) => {
    const signUpResponse = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return signUpResponse;
  };

  return [signUp, result];
};

export default useSignUp;

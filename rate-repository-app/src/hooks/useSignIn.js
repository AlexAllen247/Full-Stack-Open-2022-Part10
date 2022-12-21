import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.error(error);
    },
  });

  const signIn = async ({ username, password }) => {
    const tokenResponse = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    await authStorage.setAccessToken(tokenResponse.data.authenticate.accessToken);
    apolloClient.resetStore();
    return tokenResponse;
  };

  return [signIn, result];
};

export default useSignIn;

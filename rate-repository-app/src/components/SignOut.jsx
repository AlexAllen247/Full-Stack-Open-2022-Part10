import { Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const SignOut = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <Pressable onPress={signOut}>
      <Text
        style={styles.text}
        color="white"
        fontSize="subheading"
        fontWeight="bold"
      >
        Sign out
      </Text>
    </Pressable>
  );
};

export default SignOut;

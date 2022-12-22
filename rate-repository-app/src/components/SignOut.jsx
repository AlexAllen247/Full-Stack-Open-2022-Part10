import { Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    color: theme.colors.appBarText,
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
      <Text style={styles.text}>Sign out</Text>
    </Pressable>
  );
};

export default SignOut;

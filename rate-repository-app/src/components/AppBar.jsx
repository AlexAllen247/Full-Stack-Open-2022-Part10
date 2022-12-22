import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import SignOut from "./SignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const AppBar = () => {
  const { loading, data } = useQuery(GET_ME);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/" tab="Repositories" />
        {!loading && data.me ? (
          <>
            <AppBarTab path="/createreview" tab={"Create a review"} />
            <SignOut />
          </>
        ) : (
          <>
            <AppBarTab path="/signin" tab="Sign in" />
            <AppBarTab path="/signup" tab="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

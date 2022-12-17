import { StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ path, tab }) => {
  return (
    <Link to={path}>
    <Pressable>
      <Text style={styles.text}>{tab}</Text>
    </Pressable>
    </Link>
  );
};

export default AppBarTab;

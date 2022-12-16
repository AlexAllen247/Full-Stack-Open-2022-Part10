import { StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ tab }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{tab}</Text>
    </Pressable>
  );
};

export default AppBarTab;

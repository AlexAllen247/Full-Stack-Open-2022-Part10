import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flexItemA: {
    padding: 4,
    flexShrink: 1,
  },
  flexItemB: {
    padding: 4,
    borderWidth: 0,
    borderRadius: 4,
    overflow: "hidden",
    color: "white",
  },
  text: {
    paddingBottom: 8,
  },
});

const RepoDesc = ({ repository }) => {
  return (
    <View style={styles.flexItemA}>
      <Text style={styles.text} fontSize="subheading" fontWeight="bold">
        {repository.fullName}
      </Text>
      <Text style={styles.text} color="textSecondary">
        {repository.description}
      </Text>
      <View style={styles.flexContainer}>
        <Text style={styles.flexItemB} backgroundColor="primary">
          {repository.language}
        </Text>
      </View>
    </View>
  );
};

export default RepoDesc;

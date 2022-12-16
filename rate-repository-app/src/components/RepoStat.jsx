import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
});

const RepoStat = ({ stat, title }) => {
  return (
    <View style={styles.flexContainer}>
      <Text fontSize="subheading" fontWeight="bold">
        {stat > 1000 ? Math.round(stat / 100) / 10.0 + "k" : stat}
      </Text>
      <Text color="textSecondary">{title}</Text>
    </View>
  );
};

export default RepoStat;

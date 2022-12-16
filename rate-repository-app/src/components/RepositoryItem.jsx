import { View, StyleSheet } from "react-native";
import Avatar from "./Avatar";
import RepoDesc from "./RepoDesc";
import RepoStat from "./RepoStat";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  flexContainerA: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  flexContainerB: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerA}>
        <Avatar repository={repository} />
        <RepoDesc repository={repository} />
      </View>
      <View style={styles.flexContainerB}>
        <RepoStat stat={repository.stargazersCount} title="Stars" />
        <RepoStat stat={repository.forksCount} title="Forks" />
        <RepoStat stat={repository.reviewCount} title="Reviews" />
        <RepoStat stat={repository.ratingAverage} title="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;

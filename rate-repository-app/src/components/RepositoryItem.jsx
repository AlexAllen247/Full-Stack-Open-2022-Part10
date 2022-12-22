import { View, StyleSheet, Pressable } from "react-native";
import Avatar from "./Avatar";
import RepoDesc from "./RepoDesc";
import RepoStat from "./RepoStat";
import Text from "./Text";
import { openURL } from "expo-linking";

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
  button: {
    marginTop: 15,
    padding: 15,
    textAlign: "center",
    borderWidth: 0,
    borderRadius: 4,
    overflow: "hidden",
    color: "white",
  },
});

const RepositoryItem = ({ repository, url }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {url && (
        <Pressable onPress={() => openURL(repository.url)}>
          <Text
            style={styles.button}
            backgroundColor="primary"
            fontWeight="bold"
          >
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;

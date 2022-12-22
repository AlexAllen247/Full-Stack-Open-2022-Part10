import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import Text from "./Text";
import theme from "../theme";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortPicker: {
    height: 50,
    width: "80%",
  },
  sortByText: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  sortByContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
    backgroundColor: "lightgrey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const viewItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
        <RepositoryItem repository={item} />
      </Pressable>
    );
  };

  const SortComponent = ({ sortBy, setSortBy }) => {
    return (
      <View style={styles.sortByContainer}>
        <View style={{ justifyContent: "center", height: 50 }}>
          <Text style={styles.sortByText}>Order By</Text>
        </View>
        <Picker
          selectedValue={sortBy}
          style={styles.sortPicker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Latest Repositories" value="latest" />
          <Picker.Item
            label="Highest rated Repositories"
            value="highestRated"
          />
          <Picker.Item label="Lowest rated Repositories" value="lowestRated" />
        </Picker>
      </View>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={viewItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <SortComponent sortBy={sortBy} setSortBy={setSortBy} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latest");
  const { repositories } = useRepositories(sortBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

export default RepositoryList;

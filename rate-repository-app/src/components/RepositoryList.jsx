import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
import Text from "./Text";
import theme from "../theme";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

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
    borderWidth: 2,
    borderRadius: 10,
  },
  searchBarContainer: {
    margin: 10,
    marginBottom: 0,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortBy, setSortBy, search, setSearch } = this.props;

    return (
      <View>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={(itemValue) => setSearch(itemValue)}
            value={search}
          />
        </View>
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
            <Picker.Item
              label="Lowest rated Repositories"
              value="lowestRated"
            />
          </Picker>
        </View>
      </View>
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    const viewItem = ({ item }) => {
      return (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      );
    };

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={viewItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 500);
  const { repositories, fetchMore  } = useRepositories(sortBy, searchDebounce);
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
      search={search}
      setSearch={setSearch}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

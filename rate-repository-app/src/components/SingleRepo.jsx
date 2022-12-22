import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    repository && (
      <>
        <RepositoryItem repository={repository} url />
      </>
    )
  );
};

const SingleRepo = () => {
  const { id } = useParams();
  const { repository } = useRepository({ id });

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepo;

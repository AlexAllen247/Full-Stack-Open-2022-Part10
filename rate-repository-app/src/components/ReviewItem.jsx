import { View, StyleSheet, Pressable, Alert } from "react-native";
import { format, parseISO } from "date-fns";
import Text from "./Text";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";
import { openURL } from "expo-linking";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rating: {
    marginRight: 8,
    width: theme.icon.width,
    height: theme.icon.height,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.icon.width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flexShrink: 1,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 0,
    borderRadius: 4,
    overflow: "hidden",
    color: "white",
  },
});

const ReviewItem = ({ review, myReviews, refetch }) => {
  const [deleteReview] = useDeleteReview();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => {
            deleteReview(review.id);
            refetch();
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.details}>
        {myReviews ? (
          <Text
            style={styles.name}
          >{`${review.repository.ownerName}/${review.repository.name}`}</Text>
        ) : (
          <Text style={styles.name}>{review.user.username}</Text>
        )}
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(parseISO(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => openURL(review.repository.url)}>
          <Text
            style={styles.button}
            backgroundColor="primary"
            fontWeight="bold"
          >
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={createTwoButtonAlert}>
          <Text
            style={styles.button}
            backgroundColor="secondary"
            fontWeight="bold"
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;

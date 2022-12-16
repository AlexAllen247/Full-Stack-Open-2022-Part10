import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tinyImage: {
    width: 50,
    height: 50,
    flexGrow: 0,
    marginRight: 20,
    borderRadius: 4,
  },
});

const Avatar = ({ repository }) => {
  return (
    <Image
      style={styles.tinyImage}
      source={{
        uri: `${repository.ownerAvatarUrl}`,
      }}
    />
  );
};

export default Avatar;

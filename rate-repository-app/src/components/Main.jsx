import { Route, Routes, Navigate } from "react-router-native";
import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SingleRepo from "./SingleRepo";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:id" element={<SingleRepo />} />
      </Routes>
    </View>
  );
};

export default Main;

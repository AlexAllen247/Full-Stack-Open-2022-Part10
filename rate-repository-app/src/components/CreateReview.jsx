import { StyleSheet, View, Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#586069",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    overflow: "hidden",
    textAlign: "center",
    color: "white",
  },
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID="ownerName"
        style={styles.input}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        testID="repositoryName"
        style={styles.input}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        testID="rating"
        style={styles.input}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        testID="text"
        style={styles.input}
        name="text"
        placeholder="Review"
        multiline
      />
      <Pressable testID="signIn" onPress={onSubmit}>
        <Text
          style={styles.button}
          backgroundColor="primary"
          fontWeight="bold"
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .min(0, "Rating between 0 and 100")
    .max(100, "Rating between 0 and 100")
    .required("Rating is required"),
  text: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createreview] = useCreateReview();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { ownerName, repositoryName, rating, text } = values;
    let repositoryId;

    try {
      const response = await createreview({
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text,
      });
      console.log(response);
      repositoryId = response.data.createReview.repositoryId;
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

    resetForm(initialValues);
    setSubmitting(false);
    navigate(`/repository/${repositoryId}`);
  };
  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

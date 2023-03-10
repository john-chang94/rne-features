import { useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { ImageContext } from "../../contexts/imageContext";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen({ navigation }: any) {
  const { image }: any = useContext(ImageContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Ionicons name="person" size={30} />
        )}
        <Pressable>
          <Ionicons
            name="camera"
            size={30}
            color="lightblue"
            onPress={() => navigation.navigate("CameraScreen")}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  button: {
    marginTop: 25,
  },
  image: {
    width: 75,
    height: 75,
  },
});

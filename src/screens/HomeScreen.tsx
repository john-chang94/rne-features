import { StyleSheet, Text, View,  Button } from "react-native";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";

export default function HomeScreen({ navigation }) {
  const [initialUrl, setInitialUrl] = useState("");
  const [parsedUrl, setParsedUrl] = useState("");

  const handleDeepLink = async (url: any) => {
    setParsedUrl(JSON.stringify(Linking.parse(url), null, 2));
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      if (init !== null) {
        setInitialUrl(init);
        handleDeepLink(init);
      }
    })();

    const subscription = Linking.addEventListener("url", (e) =>
      handleDeepLink(e.url)
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10 }}>Home</Text>
      <Text style={{ marginVertical: 10 }}>INITIAL URL: {initialUrl}</Text>
      <Text style={{ marginVertical: 10 }}>PARSED URL: {parsedUrl}</Text>
      <Button title="TESTING" onPress={() => navigation.navigate("NotFound")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

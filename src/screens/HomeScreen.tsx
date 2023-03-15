import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";

export default function HomeScreen({ navigation }: any) {
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [parsedUrl, setParsedUrl] = useState("");

  const handleDeepLink = async (url: any) => {
    const { path, queryParams } = Linking.parse(url);
    if (path && queryParams) {
      console.log("HOME NAV RAN");
      setTimeout(() => {
        navigation.navigate(path, queryParams);
      }, 500);
    }
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      if (init !== null) {
        setParsedUrl(JSON.stringify(Linking.parse(init), null, 2));
        setInitialUrl(init);
        // setTimeout(() => {
          handleDeepLink(init);
        // }, 500);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (e) => {
      const url = Linking.parse(e.url);
      setParsedUrl(JSON.stringify(url, null, 2));
      setInitialUrl(null);
      // setTimeout(() => {
        handleDeepLink(e.url);
      // }, 500);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10 }}>Home</Text>
      <Text style={{ marginVertical: 10 }}>INITIAL URL: {initialUrl}</Text>
      <Text style={{ marginVertical: 10 }}>PARSED URL: {parsedUrl}</Text>
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

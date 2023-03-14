import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NotFound({ navigation }: any) {
  const [initialUrl, setInitialUrl] = useState([""]);
  const [parsedUrl, setParsedUrl] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeepLink = async (url: any) => {
    setParsedUrl((prev: any) => [
      ...prev,
      JSON.stringify(Linking.parse(url), null, 2),
    ]);
    const { path, queryParams } = Linking.parse(url);
    if (path && queryParams) {
      setIsLoading(false);
      console.log('NOT FOUND NAV RAN')
      navigation.navigate(path, queryParams);
    }
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      if (init !== null) {
        setInitialUrl((prev: any) => [...prev, init]);
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

  if (isLoading) return null;
  
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={{ marginVertical: 10 }}>Oops! Screen not found :(</Text>
      {initialUrl.map((item: any) => (
        <Text style={{ marginVertical: 10 }}>INITIAL URL: {item}</Text>
      ))}
      {parsedUrl.map((item: any) => (
        <Text style={{ marginVertical: 10 }}>PARSED URL: {item}</Text>
      ))}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 25
  },
});

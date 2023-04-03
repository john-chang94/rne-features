import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NotFound({ navigation }: any) {
  const [initialUrl, setInitialUrl] = useState([""]);
  const [parsedUrl, setParsedUrl] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const onPressHome = () => {
    navigation.replace("Root");
  };

  const handleDeepLink = async (url: any) => {
    setParsedUrl((prev: any) => [
      ...prev,
      JSON.stringify(Linking.parse(url), null, 2),
    ]);
    // const { path, queryParams } = Linking.parse(url);
    setIsLoading(false);
    // if (path && queryParams) {
    //   console.log("NOT FOUND NAV RAN");
    //   setIsLoading(false);
    //   navigation.navigate("Home", { screen: path, params: queryParams });
    // }
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      if (init !== null) {
        setInitialUrl((prev: any) => [...prev, init]);
        setTimeout(() => {
          handleDeepLink(init);
          setIsLoading(false);
          // navigation.replace("Root");
        }, 150);
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (e) => {
      setTimeout(() => {
        handleDeepLink(e.url);
      }, 500);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading)
    return (
      <View style={{ alignItems: "center", marginVertical: 40 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={{ marginVertical: 10 }}>Oops! Screen not found :(</Text>
      {initialUrl.map((item: any) => (
        <Text style={{ marginVertical: 10 }}>INITIAL URL: {item}</Text>
      ))}
      {parsedUrl.map((item: any) => (
        <Text style={{ marginVertical: 10 }}>PARSED URL: {item}</Text>
      ))}
      <Button title="HOME" onPress={onPressHome} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 35,
  },
});

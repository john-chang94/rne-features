import { StyleSheet, Text, View, Alert, Share, Button } from "react-native";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import axios from "axios";

export default function HomeScreen({ navigation }: any) {
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [parsedUrl, setParsedUrl] = useState("");

  const handleDeepLink = async (url: any) => {
    const { path, queryParams } = Linking.parse(url);
    if (path && queryParams) {
      console.log("HOME NAV RAN");
      // setTimeout(() => {
      navigation.navigate(path, queryParams);
      // }, 250);
    }
  };

  const handleShare = async () => {
    const body = {
      dynamicLinkInfo: {
        domainUriPrefix: "https://onebooklink.page.link",
        link: "https://onebook-deep-link.web.app/ProDetails?proId=123f3j93",
        androidInfo: {
          androidPackageName: "com.rnefeatures.dev",
        },
        iosInfo: {
          iosBundleId: "com.rnefeatures.dev",
        }
      },
    };
    const link = await axios.post(
      "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAIiqf_Z51z8MIhU23Si8nE7JYmKUfSDBQ",
      body
    );

    try {
      const result = await Share.share({
        message: `Check out my profile! \n${link.data.shortLink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error);
    }
    console.log(JSON.stringify(link, null, 2));
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      if (init !== null) {
        setParsedUrl(JSON.stringify(Linking.parse(init), null, 2));
        setInitialUrl(init);
        handleDeepLink(init);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (e) => {
      const url = Linking.parse(e.url);
      setParsedUrl(JSON.stringify(url, null, 2));
      setInitialUrl(null);
      handleDeepLink(e.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button title="SHARE" onPress={handleShare} />
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

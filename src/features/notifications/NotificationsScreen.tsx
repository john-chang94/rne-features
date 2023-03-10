import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { theme } from "../../theme";
import { isAndroid } from "../../utils/sysChecks";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [seconds, setSeconds] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Use to get push tickets and receipts
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function schedulePushNotification() {
    if (!title && !body) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: { seconds: 2 },
      });
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (isAndroid) {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  function clearNotificationText() {
    setNotification(false);
    setTitle("");
    setBody("");
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    ).catch((error) => {
        console.log(error);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
        </View>
        <Text style={theme.spacer.topXl}>
          Fill in the information for the push notification
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={theme.doubleSpacer.tbMd}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={theme.doubleSpacer.tbMd}
            placeholder="Body"
            value={body}
            onChangeText={setBody}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await schedulePushNotification();
            }}
          >
            <Text>Press to schedule a notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={clearNotificationText}
          >
            <Text>Clear notification message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  button: {
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});

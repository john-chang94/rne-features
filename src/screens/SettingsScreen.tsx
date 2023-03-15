import { Button, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";

export default function SettingsScreen({ navigation }: any) {
  const onPressHome = () => {
    navigation.replace("Root");
  };
  const onPressPro = () => {
    navigation.navigate("ProDetails", { proId: "1NdudyrUJmGOjDWyxUsz" });
    // Linking.openURL("exp://192.168.1.101:19000/--/ProDetails?proId=1NdudyrUJmGOjDWyxUsz")
  };
  const onPressNotFound = () => {
    navigation.navigate("NotFound");
  }

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="HOME" onPress={onPressHome} />
      <View style={{ marginVertical: 15 }} />
      <Button title="PRO DETAILS" onPress={onPressPro} />
      <View style={{ marginVertical: 15 }} />
      <Button title="NOT FOUND" onPress={onPressNotFound} />
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

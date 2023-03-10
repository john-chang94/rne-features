import { StyleSheet, Text, View } from "react-native";

export default function ProDetails({ route }: any) {
  const { proId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Pro ID: {proId}</Text>
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

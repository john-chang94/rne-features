import { Button, StyleSheet, Text, View } from 'react-native'

export default function SettingsScreen({ navigation }: any) {
  const onPressHome = () => {
    navigation.replace("Root");
  }
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="HOME" onPress={onPressHome} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
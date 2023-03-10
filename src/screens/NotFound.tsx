import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text>Oops! Screen not found :(</Text>
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
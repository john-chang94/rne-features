import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import NotFound from "../screens/NotFound";
import { ImageContextProvider } from "../contexts/imageContext";
import LinkingConfiguration from "./LinkingConfiguration";
import * as Linking from "expo-linking";

const navigationRef = createNavigationContainerRef();

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <ImageContextProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
        ref={navigationRef}
        fallback={<Text>Loading...</Text>}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFound}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageContextProvider>
  );
}

const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  const navigation = useNavigation();

  // const handleDeepLink = async (url: any) => {
  //   const { path, queryParams } = Linking.parse(url);
  //   if (path && queryParams) {
  //     navigation.navigate("Home", { screen: path, params: queryParams });
  //     console.log("INDEX DEEP LINK RAN");
  //   }
  // };

  // useEffect(() => {
  //   const subscription = Linking.addEventListener("url", (e) =>
  //     setTimeout(() => {
  //       handleDeepLink(e.url);
  //     }, 2000)
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const init = await Linking.getInitialURL();
  //     if (navigationRef.current?.getRootState().index === 0) {
  //       if (init !== null) {
  //         setTimeout(() => {
  //           handleDeepLink(init);
  //         }, 1000);
  //       }
  //     }
  //   })();
  // }, [navigationRef.current]);

  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

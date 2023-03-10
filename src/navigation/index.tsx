import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  const BottomTab = createBottomTabNavigator();

  const navigation = useNavigation();

  const handleDeepLink = async (url: any) => {
    const { path, queryParams } = Linking.parse(url);
    console.log("PARSED LINK", JSON.stringify(Linking.parse(url), null, 2));

    // addSuggestedCategory({ parsedUrl: Linking.parse(url) });

    if (path && queryParams) {
      navigation.navigate(path, { proId: queryParams.proId });
    }
  };

  useEffect(() => {
    (async () => {
      const init = await Linking.getInitialURL();
      console.log("INITIAL URL", init);
      //   addSuggestedCategory({ initialUrl: init });
      if (init !== null) {
        handleDeepLink(init);
      }
      if (navigationRef.isReady()) {
        setIsLoading(false);
      }
    })();

    const subscription = Linking.addEventListener("url", (e) =>
      handleDeepLink(e.url)
    );

    return () => {
      subscription.remove();
    };
  }, [navigationRef]);

  if (isLoading) return null;

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

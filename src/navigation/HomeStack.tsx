import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../features/camera/CameraScreen";
import CameraShutterScreen from "../features/camera/CameraShutterScreen";
import NotificationsScreen from "../features/notifications/NotificationsScreen";
import Home from "../screens/HomeScreen";
import NotFound from "../screens/NotFound";
import ProDetails from "../screens/ProDetails";

export default function HomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "Camera" }}
      />
      <Stack.Screen
        name="CameraShutterScreen"
        component={CameraShutterScreen}
      />
      <Stack.Screen
        name="ProDetails"
        component={ProDetails}
        options={{ title: "Pro Details" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Not Found" }}
      />
    </Stack.Navigator>
  );
}

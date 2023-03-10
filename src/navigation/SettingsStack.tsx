import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/SettingsScreen";

export default function SettingsStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking = {
  prefixes: [
    Linking.createURL("/"),
    "rnefeatures://",
    "https://johnchang.me",
    "https://*.johnchang.me",
  ],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeStack: {
                screens: {
                  HomeScreen: "HomeScreen",
                  ProDetails: "ProDetails",
                },
              },
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "SettingsScreen",
            },
          },
        },
      },
      NotFound: "NotFound",
    },
  },
};

export default linking;

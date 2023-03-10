export default {
  expo: {
    name: "rne-features",
    slug: "rne-features",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "rnefeatures",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.rnefeatures.dev",
      associatedDomains: ["applinks:johnchang.me"],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.rnefeatures.dev",
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "rnefeatures://",
              host: "*johnchang.me",
              pathPrefix: "/pros"
            },
            {
              scheme: "rnefeatures://",
              host: "*.johnchang.me",
              pathPrefix: "/pros"
            },
            {
              scheme: "https://",
              host: "*johnchang.me",
              pathPrefix: "/pros"
            },
            {
              scheme: "https://",
              host: "*.johnchang.me",
              pathPrefix: "/pros"
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
      versionCode: 2,
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    owner: "johnc94",
    extra: {
      eas: {
        projectId: "7501daf5-7ba4-481c-adde-f05ffa3c32cb"
      }
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera."
        }
      ]
    ]
  }
}

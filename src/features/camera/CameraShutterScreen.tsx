import { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { ImageContext } from "../../contexts/imageContext";
import { Ionicons } from "@expo/vector-icons";
import { isAndroid } from "../../utils/sysChecks";

export default function CameraShutterScreen({ navigation }: any) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<any>();

  const { setImage }: any = useContext(ImageContext);

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

//   const getPermission = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     requestPermission(status === "granted");
//   };

  const flipCamera = () => {
    setType(
      type === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

  const snap = async () => {
    if (cameraRef) {
      const image = await cameraRef.current.takePictureAsync();
      setImage(image.uri);
      navigation.goBack();
    }
  };

  // [ANDROID]
  const prepareRatio = async () => {
    let desiredRatio = ratio;
    if (isAndroid) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // Find the ratio that is closest to the screen ratio without going over
      let distances: any = {};
      let realRatios: any = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // Ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // Set the best match
      desiredRatio = minDistance;
      //  Calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // Set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // Camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (!permission?.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      ref={(camera) => (cameraRef.current = camera)}
      style={[
        styles.container,
        { marginTop: imagePadding, marginBottom: imagePadding },
      ]}
      type={type}
      onCameraReady={setCameraReady}
      ratio={isAndroid && ratio}
    >
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => flipCamera()}>
          <Ionicons name="camera-reverse" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => snap()}>
          <Ionicons name="ellipse-outline" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={32} />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // marginTop: isAndroid ? imagePadding : 0,
    // marginBottom: isAndroid ? imagePadding : 0
  },
  innerContainer: {
    height: 125,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});

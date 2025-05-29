import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import HomeScreen from "./screens/HomeScreen";
import PatientCheckScreen from "./screens/PatientCheckScreen";
import EmergencyServicesScreen from "./screens/EmergencyServicesScreen";
import HandPositionScreen from "./screens/HandPositionScreen";
import BodyPositionScreen from "./screens/BodyPositionScreen";
import CompressPositionScreen from "./screens/CompressPositionScreen";
import BreathPositionScreen from "./screens/BreathPositionScreen";
import CompressionScreen from "./screens/CompressionScreen";

// Initialize the Stack navigator

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
    "Adlam-Regular": require("./assets/fonts/ADLaMDisplay-Regular.ttf"),
    "Alatsi-Regular": require("./assets/fonts/Alatsi-Regular.ttf"),
    "TiltWarp-Regular": require("./assets/fonts/TiltWarp-Regular.ttf"),
    // Add more fonts here if needed
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide headers for all screens
          animation: "fade", // Use fade transition
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientCheckScreen"
          component={PatientCheckScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmergencyServicesScreen"
          component={EmergencyServicesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HandPositionScreen"
          component={HandPositionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BodyPositionScreen"
          component={BodyPositionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompressPositionScreen"
          component={CompressPositionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BreathPositionScreen"
          component={BreathPositionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompressionScreen"
          component={CompressionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

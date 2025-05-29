import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(
    React.useCallback(() => {
      let sound;

      // Function to play music
      const playMusic = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require("../assets/music/Intro.mp3") // Replace with the path to your music file
        );
        sound = soundObject;
        await sound.playAsync();
      };

      playMusic();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // Duration of the fade-in animation
        useNativeDriver: true,
      }).start();

      return () => {
        // Cleanup function to stop and unload the sound
        if (sound) {
          sound.stopAsync();
          sound.unloadAsync();
        }
      };
    }, [fadeAnim])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/s1.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../assets/logo.png")} // Replace with actual image path
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Quick instructions to save lives.
      </Animated.Text>

      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => navigation.navigate("PatientCheckScreen")}
        >
          <Text style={styles.btn1_txt}>Save Lives</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
    position: "absolute",
    top: "12%",
    alignSelf: "center",
    marginBottom: 20,
  },
  text: {
    fontFamily: "Alata-Regular",
    fontSize: width * 0.05,
    position: "absolute",
    top: "33%",
    textAlign: "center",
    width: "80%",
    color: "#000",
  },
  btn1: {
    backgroundColor: "#EB1D29",
    padding: 20,
    width: width * 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    opacity: 0.9,
  },
  btn1_txt: {
    fontFamily: "Adlam-Regular",
    color: "#fff",
    fontSize: width * 0.045,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    bottom: "15%",
    position: "absolute",
  },
});

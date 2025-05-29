import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function BodyPositionScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      let sound;

      // Function to play music
      const playMusic = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require("../assets/music/BodyPosition.mp3") // Replace with the path to your music file
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
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../assets/logo.png")} // Replace with actual image path
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Take into account proper position
      </Animated.Text>
      <View style={styles.scrollViewWrapper}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.helpCont}>
            <Animated.Image
              source={require("../assets/img/bodypos.png")} // Replace with actual image path
              style={[styles.posImg, { opacity: fadeAnim }]}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>BODY POSITION</Text>
            <Text style={styles.infoText}>
              Shoulders directly over hands; elbows locked. Make sure hands are
              in 90 degrees to the body.
            </Text>
          </View>
        </ScrollView>
      </View>
      <Image
        source={require("../assets/img/pg2.png")} // Replace with actual image path
        style={styles.pageIndicator}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { marginRight: 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("CompressPositionScreen")}
          >
            <Text style={styles.btnTxt}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: "contain",
    position: "absolute",
    top: "10%",
    alignSelf: "center",
  },
  text: {
    fontFamily: "Alatsi-Regular",
    fontSize: width * 0.05,
    position: "absolute",
    top: "28%",
    textAlign: "center",
    width: "80%",
    color: "#000",
  },
  btn: {
    backgroundColor: "#EB1D29",
    padding: 20,
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    opacity: 0.9,
    marginBottom: 10,
  },
  btnTxt: {
    fontFamily: "Adlam-Regular",
    color: "#fff",
    fontSize: width * 0.045,
    textAlign: "center",
    fontWeight: "bold",
  },
  helpCont: {
    position: "absolute",
    top: "35%",
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
  },
  posImg: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: "contain",
    marginBottom: 10,
  },
  infoContainer: {
    top: "65%",
    flex: 1,
    width: "80%",
    alignItems: "center",
  },
  infoTitle: {
    fontFamily: "TiltWarp-Regular",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  infoText: {
    fontFamily: "Alata-Regular",
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: 20,
  },
  pageIndicator: {
    position: "absolute",
    bottom: "20%",
    width: width * 0.15,
    height: height * 0.02,
  },
  buttonContainer: {
    bottom: "8%",
    flex: 1,
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  buttonRow: {
    flexDirection: "row",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: "25%",
    overflow: "hidden",
    zindex: -1,
  },
  scrollViewWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "20%",
  },
});

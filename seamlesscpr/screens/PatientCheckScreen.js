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
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function PatientCheckScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let sound;

      // Function to play music
      const playMusic = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require("../assets/music/CheckPatient.mp3") // Replace with the path to your music file
        );
        sound = soundObject;
        await sound.playAsync();
      };

      playMusic();

      return () => {
        // Cleanup function to stop and unload the sound
        if (sound) {
          sound.stopAsync();
          sound.unloadAsync();
        }
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Image
        source={require("../assets/logo.png")} // Replace with actual image path
        style={styles.logo}
      />
      <Text style={styles.text}>Check the patient for the following:</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.helpCont}>
          <Image
            source={require("../assets/img/Responsiveness.png")} // Replace with actual image path
            style={styles.helpImg}
          />
          <Image
            source={require("../assets/img/Breathing.png")} // Replace with actual image path
            style={styles.helpImg}
          />
          <Image
            source={require("../assets/img/Pulse.png")} // Replace with actual image path
            style={styles.helpImg}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { marginRight: 10 }]}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("EmergencyServicesScreen")}
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
    marginBottom: "20%",
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  helpCont: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    top: "5%",
    marginTop: 20,
  },
  helpImg: {
    width: width * 0.8,
    height: height * 0.15,
    resizeMode: "contain",
    marginBottom: 5,
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
});

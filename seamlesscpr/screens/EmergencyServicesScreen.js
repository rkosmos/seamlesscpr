import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { Audio } from "expo-av";

export default function EmergencyServicesScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      let sound;

      // Function to play music
      const playMusic = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require("../assets/music/Emergency.mp3") // Replace with the path to your music file
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Get user location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, [fadeAnim]);

  // Function to trigger phone call
  const handleCall = () => {
    Linking.openURL("tel:0912887");
  };

  // Function to send SMS with location
  const handleSendSMS = () => {
    if (!location) {
      Alert.alert(
        "Location not available",
        "Please enable location services or enter location manually"
      );
      const message = `I am performing CPR on someone and need dire help. I am located at [ENTER LOCATION HERE] \n Please send acknowledgment and send help immediately.\n\nThank you!`;

      const smsUrl = `sms:0912887?body=${encodeURIComponent(message)}`;
      Linking.openURL(smsUrl).catch((err) => {
        Alert.alert("Error", "Could not open messaging app.");
        console.error(err);
      });
      return;
    }

    const message = `I am performing CPR on someone and need dire help. I am located at:\nLatitude: ${location.latitude}, Longitude: ${location.longitude}\nPlease send acknowledgment and send help immediately.\n\nThank you!`;

    const smsUrl = `sms:0912887?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl).catch((err) => {
      Alert.alert("Error", "Could not open messaging app.");
      console.error(err);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../assets/logo.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Reach out to emergency services
      </Animated.Text>

      <View style={styles.helpCont}>
        {/* Call Button */}
        <TouchableOpacity onPress={handleCall} activeOpacity={0.7}>
          <Animated.Image
            source={require("../assets/img/Call.png")}
            style={[styles.helpImg, { opacity: fadeAnim }]}
          />
        </TouchableOpacity>

        {/* SMS Button */}
        <TouchableOpacity onPress={handleSendSMS} activeOpacity={0.7}>
          <Animated.Image
            source={require("../assets/img/Msg.png")}
            style={[styles.helpImg, { opacity: fadeAnim }]}
          />
        </TouchableOpacity>
      </View>

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
            onPress={() => navigation.navigate("HandPositionScreen")}
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
  helpImg: {
    width: width * 0.9,
    height: height * 0.2,
    resizeMode: "contain",
    marginBottom: 10,
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

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function CompressionScreen() {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageSource, setImageSource] = useState(
    require("../assets/img/startmusic.png")
  );
  const [beatCount, setBeatCount] = useState(0);
  const sound = useRef(new Audio.Sound());
  const beatInterval = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      let sound;

      // Function to play music
      const playMusic = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require("../assets/music/Repeat.mp3") // Replace with the path to your music file
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

  useEffect(() => {
    return sound.current
      ? () => {
          sound.current.unloadAsync();
          clearInterval(beatInterval.current);
        }
      : undefined;
  }, []);

  const startBeatCounter = () => {
    beatInterval.current = setInterval(() => {
      setBeatCount((prev) => (prev >= 103 ? 0 : prev + 1));
    }, 576); // 104 BPM ~ 576ms per beat
  };

  const handlePress = async () => {
    if (isPlaying) {
      await sound.current.stopAsync();
      await sound.current.setPositionAsync(0);
      clearInterval(beatInterval.current);
      setBeatCount(0);
      startBeatCounter();
      await sound.current.playAsync();
    } else {
      try {
        await sound.current.loadAsync(
          require("../assets/music/stayingalive.mp3")
        );
        await sound.current.playAsync();
        setIsPlaying(true);
        setImageSource(require("../assets/img/restart.png"));
        startBeatCounter();
      } catch (error) {
        console.log("Error loading or playing sound", error);
      }
    }
  };

  const stopAllSounds = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../assets/logo.png")} // Replace with actual image path
          style={styles.logo}
        />
        <Text style={styles.text}>Repeat until emergency services arrive</Text>

        <View style={styles.helpCont}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../assets/img/Chest_compressions.gif")} // Replace with actual image path
              style={[styles.posImg, { height: 170, width: 300 }]}
            />
          </View>
          <Image
            source={require("../assets/img/music.png")} // Replace with actual image path
            style={styles.helpImg}
          />
          <Image
            source={require("../assets/img/warning.png")} // Replace with actual image path
            style={styles.helpImg}
          />
        </View>
        <View style={styles.metronomeContainer}>
          <Text style={styles.metronomeText}>
            BEAT NUMBER:{" "}
            <Text style={{ fontFamily: "Alata-Regular" }}>{beatCount}/104</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <Image
            source={imageSource}
            style={[styles.helpImg, { height: 70, marginBottom: 10 }]}
          />
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.btn1, { marginRight: 10 }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btn1Txt}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => {
                stopAllSounds();
                navigation.navigate("HomeScreen");
              }}
            >
              <Text style={[styles.btn1Txt, { fontSize: 16.5 }]}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: width,
    height: "100%",
    position: "absolute",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20, // Add some padding at the bottom to ensure the content is not cut off
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: "10%", // Adjust the margin to position the logo correctly
    alignSelf: "center", // Center the logo horizontally
    marginBottom: "5%", // Optional: Add some margin from the top
  },
  text: {
    fontFamily: "Alatsi-Regular",
    fontSize: 20,
    textAlign: "center",
    width: "80%", // Ensure the text is centered and within the view
    color: "#000", // Ensure the text color is visible against the background
    marginBottom: 20, // Add some margin at the bottom
  },
  btn1: {
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
  btn1Txt: {
    fontFamily: "Adlam-Regular",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  helpCont: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10, // Add some margin at the bottom
  },
  helpImg: {
    width: 320,
    height: 120,
    resizeMode: "contain",
    marginBottom: 2, // Add some margin at the bottom
  },
  imageWrapper: {
    borderRadius: 30, // Add border radius here
    overflow: "hidden", // Ensure the border radius is respected
    marginBottom: 20, // Add some margin at the bottom
  },
  posImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bottomContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20, // Add some margin at the bottom
  },
  metronomeContainer: {
    width: "80%",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#DADCDF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Add some margin at the bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    opacity: 0.9,
    transform: [{ scale: 0.9 }], // Scale the metronome container slightly for a pulsing effect
  },
  metronomeText: {
    fontSize: 20,
    fontFamily: "TiltWarp-Regular",
  },
});

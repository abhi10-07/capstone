import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace("Home");
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Logo.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaeaea",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Button,
  Text,
  Dimensions,
  Image
} from "react-native";

export default class ButtonExample extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  handleShow = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  render() {
    const screenHeight = Dimensions.get("window").height;

    const overlay = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp"
          })
        }
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    return (
      <View>
        <View style={styles.fullScreenHack}>
          <Text>Modal Example</Text>
          <Animated.View style={[styles.buttonBox]} />
          <Button title={"Start the Show"} onPress={this.handleShow} />
          <View style={styles.break} />
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.overlay, overlay]}
          >
            <Animated.View style={[styles.modalBox]}>
              <Text style={styles.modalTitleText}>
                It was a Modal the whole time!
              </Text>
              <Image source={require("../img/meme.jpeg")} />
              <Button title={"Close"} onPress={this.handleClose} />
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  fullScreenHack: {
    height: 812
  },
  buttonBox: {
    backgroundColor: "red",
    width: 350,
    height: 350,
    margin: 12.5
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10
  },
  modalTitleText: {
    fontSize: 20,
    margin: 10
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center"
    // position: "absolute",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0
  }
});

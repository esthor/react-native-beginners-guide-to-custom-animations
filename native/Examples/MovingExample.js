import React, { Component } from "react";
import { StyleSheet, View, Animated, Button, Text } from "react-native";

export default class ButtonExample extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  handleShow = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500
      // useNativeDriver: true
    }).start();
  };
  handleHide = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 500
      // useNativeDriver: true
    }).start();
  };

  render() {
    const button = {
      transform: [
        {
          translateX: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [500, 0]
          })
        }
      ]
    };

    return (
      <View style={styles.container}>
        <Text>Moving Example</Text>
        <Animated.View style={[styles.buttonBox, button]} />
        <Button title={"Show Yourself"} onPress={this.handleShow} />
        <Button title={"Go Away"} onPress={this.handleHide} />
        <View style={styles.break} />
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
  buttonBox: {
    backgroundColor: "red",
    width: 350,
    height: 350
  }
});

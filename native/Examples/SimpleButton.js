import React, { Component } from "react";
import { StyleSheet, View, Animated, Button, Text } from "react-native";

export default class ButtonExample extends Component {
  state = {
    animation: new Animated.Value(1)
  };

  animateMe = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 1000
    }).start();
  };

  render() {
    const button = {
      opacity: this.state.animation
    };

    return (
      <View style={styles.container}>
        <Text>Simple Button Example</Text>
        <Animated.View style={[styles.bigRedButton, button]} />
        <Button title="Press Me" onPress={this.animateMe} />
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
  bigRedButton: {
    backgroundColor: "red",
    width: 350,
    height: 350
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Animated, Button, Text } from "react-native";

export default class ButtonExample extends Component {
  state = {
    animation: new Animated.Value(10)
  };

  handleBig = () => {
    Animated.timing(this.state.animation, {
      toValue: 10,
      duration: 500
      // Oh No You Don't!
      // useNativeDriver: true
    }).start();
  };
  handleSmall = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 500
      // useNativeDriver: true
    }).start();
  };

  render() {
    const button = {
      width: this.state.animation.interpolate({
        inputRange: [0, 10],
        outputRange: [150, 350],
        extrapolate: "clamp"
      }),
      height: this.state.animation.interpolate({
        inputRange: [0, 10],
        outputRange: [150, 350],
        extrapolate: "clamp"
      })
    };

    return (
      <View style={styles.container}>
        <Text>Sizing Example</Text>
        <Animated.View style={[styles.buttonBox, button]} />
        <Button title={"Big Red"} onPress={this.handleBig} />
        <Button title={"Shrink"} onPress={this.handleSmall} />
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

import React, { Component } from "react";
import { StyleSheet, View, Animated, Button } from "react-native";

export default class ButtonExample extends Component {
  state = {
    opacityAnimation: new Animated.Value(0),
    positionAnimation: new Animated.Value(0),
    sizeAnimation: new Animated.Value(0)
  };

  handleShow = () => {
    Animated.sequence([
      Animated.parallel([
        // Bring it in and fade it in as you do
        Animated.timing(this.state.opacityAnimation, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(this.state.positionAnimation, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        // make it big
        Animated.timing(this.state.sizeAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(this.state.opacityAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  handleEnd = () => {
    Animated.sequence([
      Animated.parallel([
        // Bring it in and fade it in as you do
        Animated.timing(this.state.opacityAnimation, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(this.state.sizeAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        // Bring it in and fade it in as you do
        Animated.timing(this.state.opacityAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(this.state.positionAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  render() {
    const buttonOpacity = {
      opacity: this.state.opacityAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
        // extrapolate: "clamp"
      })
    };
    const buttonPosition = {
      transform: [
        {
          translateX: this.state.positionAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [500, 0]
          })
        }
      ]
    };
    const buttonSize = {
      transform: [
        {
          scale: this.state.sizeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 1]
          })
        }
      ]
    };

    const composeStyle = {
      transform: [...buttonPosition.transform, ...buttonSize.transform]
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.buttonBox, buttonOpacity, composeStyle]}
        />
        <Button title={"Start the Show"} onPress={this.handleShow} />
        <Button title={"End."} onPress={this.handleEnd} />
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

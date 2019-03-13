if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
import Reactotron from "reactotron-react-native";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";

import SimpleButton from "./Examples/SimpleButton";
import ButtonExample from "./Examples/ButtonExample";
import SizingExample from "./Examples/SizingExample";
import MovingExample from "./Examples/MovingExample";
import SequenceExample from "./Examples/SequenceExample";
import ModalExample from "./Examples/ModalExample";

export default class App extends Component {
  handlePress = () => {
    Reactotron.log("I was pressed!");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.notchProtector} />
        <ScrollView
          style={styles.sectionContainer}
          directionalLockEnabled={true}
        >
          <Text style={styles.welcome}>Welcome to...</Text>
          <Text style={styles.welcome}>
            A Beginner's Guide to Custom Animations in React Native
          </Text>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.bigRedButton} />
          </TouchableOpacity>
          <Text style={styles.instructions}>...with Big Red Boxes </Text>
          <View style={styles.break} />
          <View>
            <SimpleButton />
            <View style={styles.break} />
            <ButtonExample />
            <View style={styles.break} />
            <SizingExample />
            <View style={styles.break} />
            <MovingExample />
            <View style={styles.break} />
            <SequenceExample />
            <View style={styles.break} />
            <ModalExample />
          </View>
          <View style={styles.notchProtector} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    width: 375
  },
  notchProtector: {
    height: 48
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  bigRedButton: {
    backgroundColor: "red",
    width: 375,
    height: 350
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  break: {
    height: 600
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

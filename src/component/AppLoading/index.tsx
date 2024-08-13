import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function AppLoading() {
  return (
    <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View> 
  );
}
const styles = StyleSheet.create({
    loadingWrapper: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 9999999,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
      },
});